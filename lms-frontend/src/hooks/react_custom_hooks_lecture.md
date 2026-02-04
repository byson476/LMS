# React 사용자 정의 훅(Custom Hook)


---

## 1. 사용자 정의 훅이란?

**사용자 정의 훅(Custom Hook)** 은

- React Hook을 내부에서 사용하는 **재사용 가능한 함수**이다.
- 반드시 함수 이름이 `use`로 시작해야 한다.
- 상태(state), 사이드 이펙트(effect), 컨텍스트(context) 로직을 묶어 재사용한다.

```txt
컴포넌트에 섞여 있는 로직을
➡ 독립적인 로직 단위로 분리
```

---

## 2. 왜 사용자 정의 훅이 필요한가?

### ❌ 커스텀 훅 없이 작성한 코드

```jsx
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    // 로그인 API 호출
  };
}
```

- 다른 컴포넌트에서도 동일한 코드 반복
- 컴포넌트가 점점 비대해짐
- 테스트 및 유지보수 어려움

---

### ✅ 커스텀 훅 적용 후

```jsx
function Login() {
  const { values, onChange, submit } = useLogin();
}
```

✔ 로직 재사용  
✔ 컴포넌트는 UI에만 집중  
✔ 유지보수 및 확장 용이

---

## 3. 사용자 정의 훅 기본 문법

```jsx
function useSomething() {
  const [state, setState] = useState();

  const action = () => {
    // 비즈니스 로직
  };

  return { state, action };
}
```

사용 방법:

```jsx
const { state, action } = useSomething();
```

---

## 4. 실무에서 가장 많이 쓰는 커스텀 훅 패턴

---

### 4-1. useForm (폼 상태 관리)

```jsx
import { useState } from "react";

function useForm(initialValue) {
  const [values, setValues] = useState(initialValue);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return { values, onChange, setValues };
}

export default useForm;
```

사용 예:

```jsx
const { values, onChange } = useForm({ email: "", password: "" });
```

📌 **폼이 많은 프로젝트에서 필수 패턴**

---

### 4-2. useAuth (인증 / 로그인 상태 관리)

```jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import * as userApi from "../api/userApi";

const useAuth = () => {
  const { loginStatus, setLoginStatus } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    await userApi.userLogoutAction();
    setLoginStatus({ isLogin: false, loginUser: {} });
    navigate("/user_main");
  };

  return { loginStatus, logout };
};

export default useAuth;
```

📌 **Spring Security + JWT 구조에서 가장 중요한 훅**

---

### 4-3. useApi (API 공통 처리)

```jsx
import { useState } from "react";

function useApi(apiFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (...args) => {
    try {
      setLoading(true);
      return await apiFn(...args);
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}

export default useApi;
```

📌 **로딩/에러 처리 표준화**

---

### 4-4. useModal (UI 상태 관리)

```jsx
import { useState } from "react";

function useModal() {
  const [open, setOpen] = useState(false);

  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false)
  };
}

export default useModal;
```

---

## 5. 사용자 정의 훅 vs 일반 함수

| 구분 | 일반 함수 | 사용자 정의 훅 |
|----|---------|---------------|
| Hook 사용 | ❌ | ✅ |
| 상태 관리 | ❌ | ✅ |
| 생명주기 | ❌ | ✅ |
| React 규칙 | ❌ | ✅ |

👉 **Hook을 사용하면 반드시 사용자 정의 훅으로 분리**

---

## 6. 사용자 정의 훅 설계 원칙 (중요 ⭐)

### 1️⃣ UI를 포함하지 않는다
```txt
❌ return <div>...</div>
```

### 2️⃣ 하나의 책임만 가진다
```txt
useAuth  → 인증
useForm  → 폼
useApi   → API 호출
```

### 3️⃣ 재사용을 최우선으로 설계한다

---

## 7. 프로젝트 폴더 구조

```txt
src/
 ├─ hooks/
 │   ├─ useAuth.js
 │   ├─ useForm.js
 │   ├─ useApi.js
 │   └─ useModal.js
```

📌 **Spring Security + JWT 프로젝트에 최적화된 구조**

---

## 8. 정리

- 사용자 정의 훅은 **React 로직 재사용의 핵심 패턴**이다.
- 컴포넌트는 UI만 담당해야 한다.
- 인증, 폼, API 로직은 반드시 커스텀 훅으로 분리한다.

> **Custom Hook = React 실무 품질을 결정하는 기준**

---

