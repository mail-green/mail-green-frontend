import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarContainer as NavigationBar } from '../../components/common/navbar';
import GlobalContainer from '../../container/GlobalContainer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSender, deleteFetch, postFetch } from '../../utils/fetch/fetch';
import { getFilterParams } from '../../utils/filter/getFilterParams';
import SearchBar from '../../components/common/SearchBar';
import { initialFilterData } from '../../data/initialFilterData';
import type { FilterList } from '../../types/filter';
import Loading, { LoadingSmall } from '../../components/common/Loading';
import useUser from '../../hooks/useUser';
import LeafIcon from '../../components/common/LeafIcon';
import BottomSheet from '../../components/common/BottomSheet';
import SuccessModal from '../../components/common/SuccessModal';
import autoAnimate from '@formkit/auto-animate';
import { AnimatePresence, motion } from 'framer-motion';
// import { Trash2, Globe } from 'lucide-react';

// 메일 데이터 타입
interface MailItem {
    id: string;
    subject: string;
    snippet: string;
    received_at: string;
    is_read: boolean;
    isDeleted: boolean;
    isImportant: boolean;
}

// 날짜별 그룹핑 함수
function groupByDate(mails: MailItem[]) {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const groups: Record<string, MailItem[]> = {};

    mails.forEach((mail) => {
        const date = mail.received_at.slice(0, 10);
        let label = '';
        if (date === today) label = '오늘';
        else if (date === yesterday) label = '어제';
        else label = date.replace(/-/g, '.'); // 예: 2025.06.01

        if (!groups[label]) groups[label] = [];
        groups[label].push(mail);
    });

    return groups;
}

const Sender = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sender, name, filterList: initialFilterList } = location.state || {};
    const user = useUser();
    // 검색어, 필터 상태 관리
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>(initialFilterList || initialFilterData);
    const queryClient = useQueryClient();
    const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 확인 모달
    const [showSuccessModal, setShowSuccessModal] = useState(false); // 삭제 성공 모달
    const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]); // 삭제할 id 목록
    const [hasImportantInDelete, setHasImportantInDelete] = useState(false); // 삭제 대상에 중요한 메일 포함 여부
    const [toast, setToast] = useState<string | null>(null); // 토스트 메시지 상태
    const [importantLoadingId, setImportantLoadingId] = useState<string | null>(null); // 중요 변경 로딩 상태

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // sender 없으면 접근 불가
    useEffect(() => {
        if (!sender) {
            navigate(-1);
        }
    }, [sender, navigate]);

    // useQuery로 getSender 호출
    const { data: result, isLoading } = useQuery({
        queryKey: ['mailSender', sender, filterList, keyword],
        queryFn: () => getSender<MailItem[]>(
            { ...getFilterParams(user.id, filterList || [], keyword), sender }
        ),
        select: (data) => {
            return data.map(mail => ({ ...mail, isDeleted: false, isImportant: false }));
        },
        enabled: !!sender,
    });

    // 삭제/보관 상태 관리
    const [mails, setMails] = useState<MailItem[]>([]);
    useEffect(() => {
        if (result) {
            setMails(result.map(mail => ({ ...mail, isDeleted: false, isImportant: mail.isImportant })));
        }
    }, [result]);

    // 삭제 API mutation
    const deleteMutation = useMutation({
        mutationFn: async ({ messageIds, confirm }: { messageIds: string[]; confirm: boolean }) => {
            return await deleteFetch(`/mail/trash?user_id=${user.id}`, {
                message_ids: messageIds,
                confirm,
                delete_protected_sender: false
            });
        },
        onSuccess: (_data, variables) => {
            if (variables.confirm) {
                // 실제 삭제 성공 시
                setShowSuccessModal(true);
                setShowConfirmModal(false);
                setMails(mails => mails.filter(m => !pendingDeleteIds.includes(m.id)));
                setPendingDeleteIds([]);
                setHasImportantInDelete(false);
                queryClient.invalidateQueries({ queryKey: ['mailSender'] });
            }
        },
    });

    // 삭제 버튼 클릭 시 (confirm: false)
    const handleDeleteRequest = () => {
        const selectedIds = mails.filter(m => m.isDeleted).map(m => m.id);
        if (selectedIds.length === 0) return;
        setPendingDeleteIds(selectedIds);
        // 중요 메일 포함 여부 확인
        const hasImportant = mails.some(m => m.isDeleted && m.isImportant);
        setHasImportantInDelete(hasImportant);
        deleteMutation.mutate({ messageIds: selectedIds, confirm: false });
        setShowConfirmModal(true);
    };

    // 모달에서 '닫기'(=실제 삭제) 클릭 시 (confirm: true)
    const handleConfirmDelete = () => {
        deleteMutation.mutate({ messageIds: pendingDeleteIds, confirm: true });
    };

    // SuccessModal 닫기 시
    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        setMails(mails => mails.map(m => ({ ...m, isDeleted: false })));
        setPendingDeleteIds([]);
        setHasImportantInDelete(false);
        queryClient.invalidateQueries({ queryKey: ['mailSender'] });
    };

    // 삭제/보관 토글
    const handleDeleteToggle = (id: string) => {
        setMails((prev) =>
            prev.map((mail) =>
                mail.id === id ? { ...mail, isDeleted: !mail.isDeleted } : mail
            )
        );
    };

    // 중요 토글
    const handleImportantToggle = async (id: string) => {
        const mail = mails.find(m => m.id === id);
        if (!mail) return;
        const userId = user.id;
        setImportantLoadingId(id); // 로딩 시작
        try {
            if (!mail.isImportant) {
                await postFetch(`/mail/${id}/star?user_id=${userId}`);
                setMails((prev) => prev.map((m) => m.id === id ? { ...m, isImportant: true } : m));
                setToast('중요 메일로 등록되었습니다.');
            } else {
                await deleteFetch(`/mail/${id}/star?user_id=${userId}`);
                setMails((prev) => prev.map((m) => m.id === id ? { ...m, isImportant: false } : m));
                setToast('중요 메일이 해제되었습니다.');
            }
        } catch {
            setToast('중요 메일 변경에 실패했습니다.');
        } finally {
            setImportantLoadingId(null); // 로딩 종료
        }
    };

    // 날짜별 그룹핑
    const grouped = useMemo(() => groupByDate(mails), [mails]);

    // 날짜별 그룹에 ref를 부여하기 위한 준비
    const dateLabels = Object.keys(grouped);
    const listRefs = useRef<(HTMLDivElement | null)[]>([]);
    useEffect(() => {
        listRefs.current.forEach((ref) => {
            if (ref) autoAnimate(ref);
        });
    }, [grouped]);

    // 삭제 선택된 메일 개수
    const deletedCount = mails.filter((m) => m.isDeleted).length;
    const carbonSaved = deletedCount * 4; // 예시: 1개당 4g

    // 토스트 메시지 자동 사라짐 (3초)
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <GlobalContainer>
            {/* 토스트 메시지 */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        key="toast"
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-auto px-4 py-2 pointer-events-none"
                    >
                        <div className="bg-main bg-opacity-80 text-white px-4 py-2 rounded-xl text-sm shadow-lg">
                            {toast}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="pb-32">
                <NavigationBar mode="recommend" title={`${name} 메일 목록`} onBack={() => navigate(-1)} />
                <div className="mt-4 px-4">
                    <SearchBar
                        noSearchBar={true}
                        value={keyword}
                        onChange={handleChange}
                        filterList={filterList}
                        setFilterList={setFilterList}
                    />
                </div>
                {isLoading && <Loading />}
                {!isLoading && dateLabels.map((dateLabel, idx) => {
                    const mailList = grouped[dateLabel];
                    if (!mailList) {
                        return (
                            <div className="mt-6 px-4" key={dateLabel}>
                                <Loading />
                            </div>
                        );
                    }
                    return mailList.length > 0 ? (
                        <div key={dateLabel} className="mt-6 px-4">
                            <div className="font-bold text-lg mb-2">{dateLabel}</div>
                            <div ref={el => { listRefs.current[idx] = el; }}>
                                {mailList.map((mail) => (
                                    <div key={mail.id} className="bg-white rounded-xl shadow p-4 mb-4">
                                        <div className="flex items-center mb-2">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg mr-3">
                                                {mail.subject[0]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold break-all">{mail.subject}</div>
                                                <div className="text-xs text-gray-500">{mail.is_read ? '읽음' : '안읽음'}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-3">{mail.snippet}</div>
                                        <div className="flex gap-2">
                                            <button
                                                className={`flex-1 py-2 rounded-lg font-bold ${mail.isDeleted ? 'bg-gray-200 text-gray-400' : 'bg-red-100 text-red-500'} transition`}
                                                onClick={() => handleDeleteToggle(mail.id)}
                                            >
                                                {mail.isDeleted ? '보관' : '삭제'}
                                            </button>
                                            <button
                                                className={`flex-1 flex-row py-2 rounded-lg font-bold border transition ${mail.isImportant ? 'bg-yellow-400 text-yellow-900 border-yellow-400' : 'bg-yellow-100 text-yellow-600 border-yellow-200'}`}
                                                onClick={() => handleImportantToggle(mail.id)}
                                                disabled={importantLoadingId === mail.id}
                                            >
                                                {importantLoadingId === mail.id
                                                    ? <LoadingSmall color={mail.isImportant ? '#FEF08A' : '#FACC15'} />
                                                    : <span role="img" aria-label="star">{mail.isImportant ? '★ 중요' : '☆ 중요'}</span>}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 px-4" key={dateLabel}>
                            <div className="font-bold text-lg mb-2">메일이 없습니다.</div>
                            <div className="text-sm text-gray-500">검색 결과가 없습니다.</div>
                        </div>
                    );
                })}
                {/* 하단 플로팅 삭제 UI */}
                <div
                    className={`
                        fixed left-0 right-0 bottom-0 z-10
                        transition-transform duration-300 ease-in-out
                        ${deletedCount > 0 ? 'translate-y-0' : 'translate-y-full pointer-events-none'}
                    `}
                    style={{ maxWidth: 390, margin: '0 auto' }}
                >
                    <div className="flex items-center justify-between bg-green-50 rounded-xl p-4 m-4 shadow-lg">
                        <div>
                            <b>메일 {deletedCount}개를 삭제해요!</b>
                            <div className="text-xs mt-1 flex items-center">
                                <span className="mr-1">🌍</span>
                                <span>예상 탄소 절감량 : <b className="text-main">{carbonSaved}g CO₂</b></span>
                            </div>
                        </div>
                        <button className="bg-main text-white rounded-full p-3 ml-4" onClick={handleDeleteRequest}>
                            <span role="img" aria-label="delete">🗑️</span>
                        </button>
                    </div>
                </div>
                {/* 삭제 확인 모달 (BottomSheet 활용, 간단 안내/확인) */}
                <BottomSheet open={showConfirmModal} onClose={() => { setShowConfirmModal(false); setHasImportantInDelete(false); }}>
                    <div className="flex flex-col items-center text-center relative">
                        {/* 오버레이 로딩 */}
                        {deleteMutation.isPending && (
                            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
                                <Loading />
                            </div>
                        )}
                        <div className="bg-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                            <LeafIcon className="w-8 h-8 text-green-500" />
                        </div>
                        {hasImportantInDelete && (
                            <div className="text-red-500 font-bold mb-2">
                                ⚠️ 중요한 메일이 포함되어 있습니다. 정말 삭제하시겠어요?
                            </div>
                        )}
                        <div className="font-bold text-lg mb-2">정말 삭제하시겠어요?</div>
                        <div className="text-sm mb-6">
                            선택한 메일 {pendingDeleteIds.length}개를 삭제합니다.<br />
                            예상 탄소 절감량: <span className="text-green-600 font-bold">{carbonSaved}g CO₂</span>
                        </div>
                        <button
                            className="w-full py-3 rounded-lg bg-main text-white font-bold text-base hover:bg-main transition mb-2"
                            onClick={handleConfirmDelete}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? <Loading /> : '삭제하기'}
                        </button>
                        <button
                            className="w-full py-3 rounded-lg border border-gray-200 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
                            onClick={() => { setShowConfirmModal(false); setHasImportantInDelete(false); }}
                            disabled={deleteMutation.isPending}
                        >
                            취소
                        </button>
                    </div>
                </BottomSheet>
                {/* 삭제 성공 모달 */}
                <SuccessModal
                    open={showSuccessModal}
                    onClose={handleSuccessClose}
                    userName={user.name || ''}
                    carbonSaved={carbonSaved}
                />
            </div>
        </GlobalContainer>
    );
};

export default Sender;