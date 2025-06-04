import {
  BadRequestError,
  NotFoundError,
  UnProcessableError,
} from "../../error/error";

export default function Fetch() {
  const baseURL = import.meta.env.VITE_REACT_SERVER_BASE_URL;

  const get = async <T>(
    url: string,
    params?: Record<string, string | number | boolean>
  ): Promise<T> => {
    console.log("GET : ", url);

    const paramsURL = new URLSearchParams(
      Object.entries(params || {}).map(([key, value]) => [key, String(value)])
    ).toString();

    const response = await fetch(`${baseURL}${url}?${paramsURL}`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new BadRequestError("Bad Request");
      } else if (response.status === 404) {
        throw new NotFoundError("Not Found");
      } else if (response.status === 422) {
        throw new UnProcessableError("UnProcessable");
      } else {
        throw new Error("UnExpected Error");
      }
    }

    return response.json();
  };

  const post = async <T = boolean, K = unknown>(
    url: string,
    body?: Record<string, K | K[]>
  ): Promise<T | boolean> => {
    console.log("POST : ", url);

    const response = await fetch(`${baseURL}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new BadRequestError("Bad Request");
      } else if (response.status === 404) {
        throw new NotFoundError("Not Found");
      } else {
        throw new Error("UnExpected Error");
      }
    }

    const text = await response.text();

    return text.length > 0 ? (JSON.parse(text) as T) : response.ok;
  };

  const put = async <T, K>(
    url: string,
    body?: Record<string, K>
  ): Promise<T> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}-${response.statusText}`);
    }

    return response.json();
  };

  return {
    get,
    post,
    put,
  };
}

const { get, post, put } = Fetch();
export { get as getFetch, post as postFetch, put as putFetch };

// 발신자별 메일 개수 조회 API
export function getSenderCounts<T>(
  params: Record<string, string | number | boolean>
) {
  return get<T>("/sender/counts", params);
}

// 개별 발신자 메일 목록 조회 API
export function getSender<T>(
  params: Record<string, string | number | boolean>
) {
  return get<T>("/sender", params);
}

// 개별 키워드(토픽) 메일 목록 조회 API
export function getKeywordMails<T>(
  params: Record<string, string | number | boolean>
) {
  return get<T>("/keyword", params);
}

export function getKeywordCounts<T>(
  params: Record<string, string | number | boolean>
) {
  return get<T>("/keyword/counts", params);
}
