import { useState, useEffect } from "react";
import type { ChatMessage } from "../types/gptChat";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "gpt_chat_histories"; // 여러 세션 저장
const MAX_HISTORY = 30; // 각 세션당 최근 30개만 저장
const MAX_TITLE_LENGTH = 20;

export interface ChatSession {
  id: string;
  title: string;
  history: ChatMessage[];
  createdAt: string;
}

function getDefaultSession(): ChatSession {
  return {
    id: uuidv4(),
    title: "새 채팅",
    history: [],
    createdAt: new Date().toISOString(),
  };
}

export function useChatHistory() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");

  // 초기화: localStorage에서 불러오기
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: ChatSession[] = JSON.parse(raw);
        setSessions(parsed);
        if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
        else {
          const def = getDefaultSession();
          setSessions([def]);
          setCurrentSessionId(def.id);
        }
      } catch {
        const def = getDefaultSession();
        setSessions([def]);
        setCurrentSessionId(def.id);
      }
    } else {
      const def = getDefaultSession();
      setSessions([def]);
      setCurrentSessionId(def.id);
    }
  }, []);

  // 변경 시 localStorage에 저장 (각 세션당 MAX_HISTORY개만)
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          sessions.map((s) => ({
            ...s,
            history:
              s.history.length > MAX_HISTORY
                ? s.history.slice(s.history.length - MAX_HISTORY)
                : s.history,
          }))
        )
      );
    } catch {
      // 용량 초과 등 에러 발생 시 안내
      console.warn("대화 내역 저장 실패: 용량 초과");
    }
  }, [sessions]);

  // 현재 세션의 history
  const currentSession =
    sessions.find((s) => s.id === currentSessionId) || getDefaultSession();

  // 메시지 추가
  const addMessage = (msg: ChatMessage) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== currentSessionId) return s;
        // 첫 메시지면 제목 갱신
        if (s.history.length === 0) {
          let title = msg.content.trim().replace(/\n/g, " ");
          if (title.length > MAX_TITLE_LENGTH)
            title = title.slice(0, MAX_TITLE_LENGTH) + "...";
          return { ...s, history: [msg], title };
        }
        return { ...s, history: [...s.history, msg] };
      })
    );
  };

  // 전체 삭제 (현재 세션만)
  const clearHistory = () => {
    setSessions((prev) =>
      prev.map((s) => (s.id === currentSessionId ? { ...s, history: [] } : s))
    );
  };

  // 새 세션 생성
  const createNewSession = () => {
    const newSession = getDefaultSession();
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  // 세션 전환
  const switchSession = (id: string) => {
    setCurrentSessionId(id);
  };

  // 빈 세션(메시지 없는 것)은 히스토리 목록에서 제외
  const visibleSessions = sessions.filter(
    (s) => s.history.length > 0 || s.id === currentSessionId
  );

  // 세션 삭제
  const removeSession = (id: string) => {
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      // 현재 세션을 삭제하면, 남은 세션 중 첫 번째로 전환 (없으면 새 세션)
      if (id === currentSessionId) {
        if (filtered.length > 0) setCurrentSessionId(filtered[0].id);
        else {
          const def = getDefaultSession();
          setSessions([def]);
          setCurrentSessionId(def.id);
          return [def];
        }
      }
      return filtered;
    });
  };

  return {
    sessions: visibleSessions,
    currentSession,
    currentSessionId,
    addMessage,
    clearHistory,
    createNewSession,
    switchSession,
    removeSession,
  };
}
