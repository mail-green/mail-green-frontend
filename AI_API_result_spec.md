# AI Function-Calling 기반 /ai/ask API 및 액션 2단계(미리보기/확정) 명세

이 문서는 백엔드의 `/ai/ask`, `/ai/preview_action`, `/ai/confirm_action` API에서 반환되는 `result` 필드의 구조를 function별로 엄밀하게 정리한 명세입니다. 프론트엔드 개발자는 이 문서를 참고하여 동적으로 응답을 파싱하고 UX를 구현할 수 있습니다.

---

## 1. 전체 동작 흐름

1. **사용자**가 프론트엔드에서 자연어로 명령(예: "광고 메일 삭제해줘")을 입력
2. **프론트엔드**는 `/ai/preview_action` API에 action, filter 조건을 POST
3. **백엔드**는 해당 조건에 맞는 메일 목록(미리보기)을 반환
4. **프론트엔드**는 목록을 사용자에게 보여주고, 사용자가 확정하면 `/ai/confirm_action` API에 message_ids를 POST
5. **백엔드**가 실제로 액션을 실행하고, 결과를 반환

---

## 2. API 명세

### 2.1. 액션 미리보기 (Preview)

**POST /ai/preview_action**

#### 요청 예시

```json
{
  "user_id": "사용자-UUID",
  "action": "delete", // 또는 "mark_important", "read", "unsubscribe"
  "filter": {
    "sender": "ad@company.com",
    "subject": "광고",
    "start_date": "2024-06-01",
    "end_date": "2024-06-10"
  }
}
```

#### 응답 예시

```json
{
  "action": "delete",
  "candidates": [
    {
      "id": "메일ID1",
      "subject": "메일 제목",
      "sender": "보낸사람",
      "snippet": "본문 미리보기",
      "received_at": "2024-06-10T12:34:56",
      "is_read": false,
      "is_starred": false
    },
    ...
  ],
  "count": 2
}
```

---

### 2.2. 액션 확정 (Confirm)

**POST /ai/confirm_action**

#### 요청 예시

```json
{
  "user_id": "사용자-UUID",
  "action": "delete", // 또는 "mark_important", "read", "unsubscribe"
  "message_ids": ["메일ID1", "메일ID2"]
}
```

#### 응답 예시 (delete)

```json
{
  "deleted": ["메일ID1", "메일ID2"],
  "count": 2
}
```

#### 응답 예시 (mark_important)

```json
{
  "starred": ["메일ID1", "메일ID2"],
  "count": 2,
  "starred_mails": [
    {
      "id": "메일ID1",
      "subject": "메일 제목",
      "sender": "보낸사람",
      "snippet": "본문 미리보기",
      "received_at": "2024-06-10T12:34:56",
      "is_read": true,
      "is_starred": true
    },
    ...
  ]
}
```

#### 응답 예시 (read)

```json
{
  "read": ["메일ID1", "메일ID2"],
  "count": 2
}
```

#### 응답 예시 (unsubscribe)

```json
{
  "unsubscribed": [
    {
      "id": "메일ID1",
      "subject": "메일 제목",
      "sender": "보낸사람",
      "snippet": "본문 미리보기",
      "received_at": "2024-06-10T12:34:56",
      "is_read": true,
      "is_starred": false,
      "unsub_url": "https://unsubscribe.example.com/..."
    }
  ],
  "failed": [
    {
      "id": "메일ID2",
      "error": "List-Unsubscribe 헤더 없음"
    }
  ],
  "count": 1
}
```

---

## 3. search_mail(조회)는 기존처럼 바로 결과 반환

**POST /ai/ask** 또는 **/ai/preview_action**에서 action: "search"로 요청

#### 응답 예시

```json
[
  {
    "id": "메일ID1",
    "subject": "메일 제목",
    "sender": "보낸사람",
    "snippet": "본문 미리보기",
    "received_at": "2024-06-10T12:34:56",
    "is_read": true,
    "is_starred": false
  },
  ...
]
```

---

## 4. 요약 표 (필드별 타입/설명 포함)

| API/Action                     | result 타입 | 주요 필드/타입/설명                                                                                                                                 |
| ------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| preview_action                 | object      | action: string<br>candidates: object[] (id, subject, sender, snippet, received_at, is_read, is_starred)<br>count: number                            |
| confirm_action(delete)         | object      | deleted: string[]<br>count: number                                                                                                                  |
| confirm_action(mark_important) | object      | starred: string[]<br>count: number<br>starred_mails: object[] (id, subject, sender, snippet, received_at, is_read, is_starred)                      |
| confirm_action(read)           | object      | read: string[]<br>count: number                                                                                                                     |
| confirm_action(unsubscribe)    | object      | unsubscribed: object[] (id, subject, sender, snippet, received_at, is_read, is_starred, unsub_url)<br>failed: object[] (id, error)<br>count: number |
| search_mail                    | array       | 각 원소: object (id, subject, sender, snippet, received_at, is_read, is_starred)                                                                    |

---

## 5. 프론트엔드 처리 팁

- 액션이 필요한 경우 preview → 사용자 확인 → confirm 순서로 연동
- 응답의 각 필드를 참고해 UX를 구현
- 실패/에러 항목이 있으면 사용자에게 안내 메시지 표시

---

> 문의/피드백: 백엔드 담당자에게 언제든 연락 주세요!
