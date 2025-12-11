import { useState, useRef } from 'react';
import searchIcon from '../assets/icons/search.png';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [TokenAddr, setTokenAddr] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');   // 경고 메시지 상태
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // 이더리움 주소 유효성 검사
  const isValidEthAddress = (addr) => {
    const trimmed = (addr || '').trim();
    if (!trimmed.startsWith('0x')) return false;
    if (trimmed.length !== 42) return false;
    const body = trimmed.slice(2);
    return /^[0-9a-fA-F]+$/.test(body);
  };

  const handleSearch = () => {
    const addr = (TokenAddr || '').trim();

    // 빈 값
    if (!addr) {
      setErrorMsg('토큰 주소를 입력해 주세요.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    // 형식 검사
    if (!isValidEthAddress(addr)) {
      setErrorMsg('Please enter a valid token address (0x + 40 hex characters).');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    // 유효한 주소일 때만 다음 로직으로
    setErrorMsg('');
    setLoading(true);

    navigate(`/loading?address=${addr}`);

    setTokenAddr('');
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      style={{
        padding: '30px',
        color: '#171821',
        display: 'flex',
        flexDirection: 'column', // 아래에 에러 메시지 한 줄 더 깔려고 column
        gap: '6px',
      }}
    >
      {/* 입력창 + 버튼 한 줄 */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <input
          ref={inputRef}
          value={TokenAddr}
          onChange={(e) => {
            setTokenAddr(e.target.value);
            if (errorMsg) setErrorMsg(''); // 타이핑 시작하면 이전 경고 제거
          }}
          onKeyDown={handleKeyPress}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="Search here.."
          className="search-input"
          style={{
            flex: '1',
            padding: '15px',
            borderRadius: '999px',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(33, 34, 45, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#d2d2d2',
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '10px 18px',
            borderRadius: '999px',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(33, 34, 45, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            cursor: loading ? 'progress' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={searchIcon}
            alt={loading ? 'Analyzing...' : 'search'}
            style={{
              width: '15px',
              height: '15px',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </button>
      </div>

      {/* 경고 메시지 */}
      {errorMsg && (
        <div
          style={{
            marginLeft: '18px',
            fontSize: '16px',
            color: '#ff6b6b',
          }}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
