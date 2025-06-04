import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarContainer as NavigationBar } from '../../components/common/navbar';
import GlobalContainer from '../../container/GlobalContainer';
import { useQuery } from '@tanstack/react-query';
import { getKeywordMails } from '../../utils/fetch/fetch';
import { getFilterParams } from '../../utils/filter/getFilterParams';
import SearchBar from '../../components/common/SearchBar';
import { initialFilterData } from '../../data/initialFilterData';
import type { FilterList } from '../../types/filter';
import Loading from '../../components/common/Loading';
import useUser from '../../hooks/useUser';

// 메일 데이터 타입 (Sender와 동일)
interface MailItem {
    id: string;
    subject: string;
    snippet: string;
    received_at: string;
    is_read: boolean;
    isDeleted: boolean;
}

// 날짜별 그룹핑 함수 (Sender와 동일)
function groupByDate(mails: MailItem[]) {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const groups: Record<string, MailItem[]> = {};

    mails.forEach((mail) => {
        const date = mail.received_at.slice(0, 10);
        let label = '';
        if (date === today) label = '오늘';
        else if (date === yesterday) label = '어제';
        else label = date.replace(/-/g, '.');

        if (!groups[label]) groups[label] = [];
        groups[label].push(mail);
    });

    return groups;
}

const Keyword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { topic_id, description, filterList: initialFilterList } = location.state || {};
    const user = useUser();
    // 검색어, 필터 상태 관리
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>(initialFilterList || initialFilterData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // topic_id 없으면 접근 불가
    useEffect(() => {
        if (!topic_id) {
            navigate(-1);
        }
    }, [topic_id, navigate]);

    // useQuery로 getKeywordMails 호출
    const { data: result, isLoading } = useQuery({
        queryKey: ['mailKeyword', topic_id, filterList, keyword],
        queryFn: () => getKeywordMails<MailItem[]>(
            { ...getFilterParams(user.id, filterList || [], keyword), topic_id }
        ),
        enabled: !!topic_id,
    });

    // 삭제/보관 상태 관리
    const [mails, setMails] = useState<MailItem[]>([]);
    useEffect(() => {
        if (result) {
            setMails(result.map(mail => ({ ...mail, isDeleted: false })));
        }
    }, [result]);

    // 삭제/보관 토글
    const handleDeleteToggle = (id: string) => {
        setMails((prev) =>
            prev.map((mail) =>
                mail.id === id ? { ...mail, isDeleted: !mail.isDeleted } : mail
            )
        );
    };

    // 날짜별 그룹핑
    const grouped = useMemo(() => groupByDate(mails), [mails]);

    // 삭제 선택된 메일 개수
    const deletedCount = mails.filter((m) => m.isDeleted).length;
    const carbonSaved = deletedCount * 4; // 예시: 1개당 4g

    return (
        <GlobalContainer>
            <div className="pb-32">
                <NavigationBar mode="recommend" title={`${description} 관련 메일`} onBack={() => navigate(-1)} />
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
                {!isLoading && Object.entries(grouped).map(([dateLabel, mailList]) => (
                    mailList.length > 0 ? (
                        <div key={dateLabel} className="mt-6 px-4">
                            <div className="font-bold text-lg mb-2">{dateLabel}</div>
                            {mailList.map((mail) => (
                                <div key={mail.id} className="bg-white rounded-xl shadow p-4 mb-4">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg mr-3">
                                            {mail.subject[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold">{mail.subject}</div>
                                            <div className="text-xs text-gray-500">{mail.is_read ? '읽음' : '안읽음'}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-3">{mail.snippet}</div>
                                    <button
                                        className={`w-full py-2 rounded-lg font-bold ${mail.isDeleted ? 'bg-gray-200 text-gray-400' : 'bg-red-100 text-red-500'} transition`}
                                        onClick={() => handleDeleteToggle(mail.id)}
                                    >
                                        {mail.isDeleted ? '보관' : '삭제'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 px-4">
                            <div className="font-bold text-lg mb-2">메일이 없습니다.</div>
                            <div className="text-sm text-gray-500">검색 결과가 없습니다.</div>
                        </div>
                    )
                ))}
                {/* 하단 플로팅 삭제 UI */}
                <div
                    className={`
                        fixed left-0 right-0 bottom-0 z-50
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
                        <button className="bg-main text-white rounded-full p-3 ml-4">
                            <span role="img" aria-label="delete">🗑️</span>
                        </button>
                    </div>
                </div>
            </div>
        </GlobalContainer>
    );
};

export default Keyword;