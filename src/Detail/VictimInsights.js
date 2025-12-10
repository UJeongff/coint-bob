import './VictimInsights.css';

// VictimInsights.js 상단에 추가
const FEATURE_KO_LABEL = {
  // ===== Dynamic 기본 테스트 =====
  buy_1: '소량 매수 성공 여부 (0.5%)',
  buy_2: '중간량 매수 성공 여부 (2%)',
  buy_3: '대량 매수 성공 여부 (5%)',

  sell_1: '소량 매도 성공 여부 (0.5%)',
  sell_2: '중간량 매도 성공 여부 (2%)',
  sell_3: '대량 매도 성공 여부 (5%)',

  sell_fail_type_1: '소량 매도 실패 유형',
  sell_fail_type_2: '중간량 매도 실패 유형',
  sell_fail_type_3: '대량 매도 실패 유형',

  existing_holders_check: '기존 홀더 매도 가능 여부',
  exterior_call_check: 'Transfer 함수의 외부 컨트랙트 호출 여부',
  tax_manipulation: '세금·수수료 조작 가능 여부',
  trading_suspend_check: '거래 임의 중단 가능 여부',
  unlimited_mint: '무제한 민팅 가능 여부',

  // ===== Honeypot 기본 피처 =====
  token_addr_idx: '토큰 인덱스(ID)',
  token_addr: '토큰 컨트랙트 주소',
  total_buy_cnt: '분석 기간 동안 발생한 전체 매수(구매) 트랜잭션 횟수',
  total_sell_cnt: '분석 기간 동안 발생한 전체 매도(판매) 트랜잭션 횟수',
  total_owner_sell_cnt: '토큰 소유자·배포자(creator 계열 주소)가 수행한 매도 트랜잭션 횟수',
  total_non_owner_sell_cnt: '일반 투자자(비-owner 주소)가 수행한 매도 트랜잭션 횟수',
  imbalance_rate: '매수와 매도 횟수의 차이가 얼마나 큰지 나타내는 비율(0에 가까울수록 균형 거래)',
  total_windows: '거래를 시간으로 쪼갠 전체 분석 윈도우(시간 구간) 개수',
  windows_with_activity: '그 중 실제로 매수·매도 거래가 발생한 시간 윈도우 개수',
  total_burn_events: '토큰 소각(burn) 이벤트가 발생한 총 횟수',
  total_mint_events: '토큰 발행(mint) 이벤트가 발생한 총 횟수',
  s_owner_count: '토큰 소유자·관리자로 추정되는 고유 지갑 주소 수',
  total_sell_vol: '분석 기간 전체 매도 트랜잭션에서 팔린 토큰 수량의 합',
  total_buy_vol: '분석 기간 전체 매수 트랜잭션에서 산 토큰 수량의 합',
  total_owner_sell_vol: '소유자·배포자 지갑이 매도한 토큰 수량의 합',
  total_sell_vol_log: '총 매도 물량을 log 스케일로 변환한 값',
  total_buy_vol_log: '총 매수 물량을 log 스케일로 변환한 값',
  total_owner_sell_vol_log: '소유자 매도 물량을 log 스케일로 변환한 값',
  liquidity_event_mask: 'LP 추가·제거 등 유동성 관련 이벤트 패턴을 비트 플래그로 인코딩한 값',
  max_sell_share: '단일 매도 트랜잭션이 전체 매도 물량에서 차지한 최대 비율',
  unique_sellers: '한 번 이상 매도한 고유 지갑(판매자) 수',
  unique_buyers: '한 번 이상 매수한 고유 지갑(구매자) 수',
  consecutive_sell_block_windows: '매도 위주(또는 매도만 존재)인 윈도우가 끊기지 않고 연속된 최장 길이',
  total_sell_block_windows: '매도 위주(또는 매도만 존재)인 윈도우의 전체 개수',
  gini_coefficient: '홀더별 토큰 보유량의 불평등 정도를 나타내는 지니 계수(1에 가까울수록 소수에게 집중)',
  total_holders: '기준 시점에 토큰을 보유한 고유 홀더 지갑 수',
  whale_count: '내부 기준 이상으로 많이 보유한 고래(대량 보유자) 지갑 수',
  whale_total_pct: '고래(대량 보유자)들이 합쳐서 보유한 물량이 전체 공급에서 차지하는 비율',
  small_holders_pct: '소액 홀더들이 합쳐서 보유한 물량이 전체 공급에서 차지하는 비율',
  holder_balance_std: '홀더별 토큰 보유량의 표준편차(보유량 들쭉날쭉 정도)',
  holder_balance_cv: '홀더 보유량의 변동계수(표준편차/평균, 평균 대비 편차 크기)',
  hhi_index: '홀더 집중도를 나타내는 HHI(헤르핀달-허쉬만) 지수, 소수 홀더에 몰릴수록 증가',
  inactive_token_flag: '거래가 거의 없어 사실상 비활성 상태에 가까운 토큰인지 여부',
  whale_domination_ratio: '고래(대량 보유자) 보유량을 나머지 홀더 보유량과 비교한 “고래 지배력” 비율',
  whale_presence_flag: '고래(대량 보유자) 홀더가 하나라도 존재하는지 여부',
  few_holders_flag: '홀더 수가 매우 적어 일부에게 과도하게 집중된 구조인지 나타내는 플래그',
  airdrop_like_flag: '다수 주소에 비슷한 소액이 뿌려진 에어드롭 형태 분포와 유사한지 여부',
  concentrated_large_community_score: '홀더는 많지만 일부에게 꽤 몰려 있는 대형 커뮤니티 토큰 성격 점수',
  hhi_per_holder: '1인당 평균 집중도(홀더 한 명의 평균 영향력)',
  whale_but_no_small_flag: '고래(대량 보유자)는 존재하지만 소액 홀더가 거의 없는 비정상 분포인지 여부',

  // (동적 분석 관련 기본 플래그는 위 Dynamic 섹션과 동일)
  balance_manipulation: '잔액 조작 가능 여부',

  // ===== 예측 모델 기본 피처 =====
  sell_vol_per_cnt: '매도 1건당 평균 매도 물량(전체 매도 물량 ÷ 매도 횟수)',
  buy_vol_per_cnt: '매수 1건당 평균 매수 물량(전체 매수 물량 ÷ 매수 횟수)',
  sell_buy_cnt_ratio: '매도 횟수를 매수 횟수로 나눈 비율(1보다 크면 매도가 더 자주 발생)',
  sell_buy_vol_ratio: '매도 물량을 매수 물량으로 나눈 비율(1보다 크면 파는 물량이 더 많음)',
  owner_sell_ratio: '전체 매도 물량 중 토큰 owner 계열 주소가 차지하는 비율',
  non_owner_sell_ratio: '전체 매도 물량 중 일반(비-owner) 주소가 차지하는 비율',
  seller_buyer_ratio: '고유 매도자 수를 고유 매수자 수로 나눈 값(판매자가 더 많은지 여부)',
  avg_sell_per_seller: '매도자 한 명당 평균 매도 횟수(소수 지갑 반복 매도 여부)',
  avg_buy_per_buyer: '매수자 한 명당 평균 매수 횟수',
  trade_balance: '(매수 횟수−매도 횟수)/(매수+매도)로 계산한 거래 방향성 지표(양수=매수 우위, 음수=매도 우위)',
  liquidity_ratio: '활동이 있었던 윈도우 수 / 전체 윈도우 수(시간상으로 거래가 얼마나 자주 있었는지)',
  sell_concentration: '“대량 매도 + 빈도” 결합 집중도 지표',
  activity_intensity: 'liquidity_ratio(시간상으로 거래가 얼마나 자주 있었는지) × (매수+매도 횟수)로 계산한 전체 거래 강도',
  vol_log_diff: '로그 스케일에서 매도 물량이 매수보다 얼마나 큰지',
  block_window_ratio: '매도 블록이 얼마나 넓게 퍼져 있는지',
  sell_vol_per_cnt_log: '매도 1건당 평균 매도 물량(sell_vol_per_cnt)에 log1p를 적용한 값',
  buy_vol_per_cnt_log: '매수 1건당 평균 매수 물량(buy_vol_per_cnt)에 log1p를 적용한 값',
  sell_concentration_log: 'sell_concentration에 log1p를 적용한 값',
  extreme_hhi_flag: '홀더 집중도를 나타내는 HHI(헤르핀달-허쉬만) 지수가 기준치를 넘는 극단적 홀더 집중 구조인지 여부',
  extreme_gini_flag: '지니 계수가 기준치를 넘는 극단적 불평등 분포인지 여부',
  holders_per_trade: '거래 1회당 평균 홀더 수(값이 작을수록 소수만 거래)',
  holders_per_activity: '활동 윈도 1개당 평균 홀더 수',
  high_holders_with_imbalance: '홀더는 많지만 거래 불균형이 큰 경우의 위험 점수',
  high_holders_active_trading: '홀더도 많고 거래도 충분하며 불균형이 낮은 정도',
  holder_data_reliability: '홀더 관련 데이터의 신뢰도(1.0에 가까울수록 정상 구조, 특이할수록 0.1~0.5로 감소)',
  holder_concentration_risk: '정규화된 홀더 집중도 지수, 거래 불균형, 홀더 수 등을 종합해 계산한 “홀더 집중도 기반 위험 점수”',
  holder_asymmetry_score: '지니 계수·홀더 수·신뢰도 저하를 함께 반영한 홀더 분포 비대칭 위험 점수',
  active_honeypot_score: '활동적인 honeypot 패턴 점수',
  excessive_minting_flag: '민팅 이벤트가 기준 횟수(예: 5회) 이상 과도하게 발생한 경우 플래그',
  sell_per_seller_ratio: '매도 횟수 / 고유 매도자 수, 소수 주소에 매도가 몰릴수록 커지는 값',
  high_sell_concentration_flag: '“소수 주소 반복 매도” 패턴 여부',
  sell_cnt_log: '총 매도 횟수에 log1p를 적용한 값',
  buy_cnt_log: '총 매수 횟수에 log1p를 적용한 값',
  activity_log: '거래가 있었던 윈도우 수에 log1p를 적용한 값',

  // ===== Dynamic 파생 피처 / 조합 피처 =====
  dynamic_risk_count: 'balance 조작·매도 차단·세금 조작 등 Dynamic 위험 플래그의 개수',
  has_any_dynamic_risk: 'Dynamic 위험 플래그가 하나라도 있으면 1, 없으면 0',
  has_multiple_risks: 'Dynamic 위험 플래그가 2개 이상 동시에 존재하면 1',
  high_risk_code: 'Dynamic 위험 플래그가 3개 이상 겹쳐 코드 구조 자체가 매우 위험한 경우',
  critical_combo_1: '매도 차단 + 잔액 조작이 동시에 존재하는 honeypot 대표 패턴',
  critical_combo_2: '블랙리스트 + 거래 중단 로직이 함께 있는 “거래 제어” 패턴',
  critical_combo_3: '무제한 민팅 + 세금 조작으로 공급·세율을 마음대로 조절 가능한 패턴',
  buy_sell_x_sell_cnt: '매도 차단 플래그에 매도 횟수를 곱한 값',
  buy_sell_x_imbalance: '매도 차단 플래그와 거래 불균형을 곱해 차단 상태에서 쏠림이 얼마나 심한지 측정',
  no_buy_sell_but_imbalanced: '매도 차단 코드는 없는데 거래 불균형이 큰 의심 상황 여부',
  balance_manip_x_concentration: '잔액 조작 플래그와 홀더 집중도를 곱한 “소수 집중 + 잔액 조작” 위험도',
  balance_manip_x_whale: '잔액 조작 플래그와 고래(대량 보유자) 지배력을 결합한 위험도',
  unlimited_mint_x_mint_events: '무제한 민팅 플래그와 민팅 이벤트 횟수를 곱한 “무제한 + 실제 남용 정도” 지표',
  mint_abuse_score: '무제한 민팅 남용 플래그',
  tax_manip_x_vol_ratio: '세금 조작 플래그와 매도/매수 물량 비를 결합한 “세금 조작 + 거래 쏠림” 위험도',
  exterior_call_x_activity: '외부 컨트랙트 호출 플래그 × 거래 강도',
  buy_sell_x_holder_imbalance: '매도 차단 플래그 × 홀더는 많지만 거래 불균형이 큰 경우의 위험 점수',
  buy_sell_x_holders_per_trade: '매도 차단 플래그 × 1/(거래 1회당 평균 홀더 수+0.01), 홀더당 거래 비율이 낮은 “못 파는 구조”를 강조',
  balance_manip_x_holder_conc: '잔액 조작 플래그 × 홀더 집중도 기반 위험 복합 위험도',
  balance_manip_x_asymmetry: '잔액 조작 플래그 × 홀더 분포 비대칭 위험(편향된 분포 + 잔액 조작) 복합 위험도',
  holders_check_x_count: '기존 홀더 매도 가능 여부 플래그 × log(홀더 수+1), 기존 홀더 검사 대상 규모 반영',
  holders_check_x_concentration: '기존 홀더 매도 가능 여부 플래그 × 홀더 집중도 기반 위험 점수, 검사와 집중 리스크 결합',
  composite_risk_score_v2: '정적(on-chain) 리스크 60% + 동적(코드 실행) 리스크 40%를 합산한 종합 위험 점수',
  verified_reliability_boost: '컨트랙트가 Etherscan에서 검증된 경우 부여하는 신뢰도 보너스',
  verified_but_risky: 'Etherscan에 검증되었지만 Dynamic 위험 플래그가 하나 이상 존재하는 “검증된 의심 컨트랙트” 여부',

  // (파생 피처 이름에 등장하지만 개별로도 쓰는 기본 플래그들)
  buy_sell: '코드 상 매도 차단 로직 존재 여부',
  blacklist_check: '블랙리스트 기반 주소 차단 로직 존재 여부',
  verified: '컨트랙트가 Etherscan에서 소스 검증(verified)된 상태인지 여부',

  // ===== Exit (RugPull) 피처 =====
  reserve_base_drop_frac: 'Base 잔액 직전 대비 감소율',
  reserve_quote: 'Quote 잔액',
  reserve_quote_drop_frac: 'Quote 잔액 직전 대비 감소율',
  price_ratio: '가격 비율',
  time_since_last_mint_sec: '마지막 민팅 이후 경과 시간',
  reserve_quote_drawdown_global: '전체 기간 Quote 잔액 감소율',
  liquidity_age_days: 'LP 생성 이후 경과 일수',
  timestamp: '탈취 예상 시점',
  tx_hash: '탈취 예상 시점의 트랜잭션 해시'
};


export default function VictimInsightsCard({ items = [] }) {
    if (!items.length) {
        return <div style={{color: '#87888c'}}>탐지 지표가 없습니다.</div>
    }

    // 카테고리별로 데이터 분류
    const honeypotPattern = items.filter(item => item.category === 'honeypot');
    const rugpullPattern = items.filter(item => item.category === 'rugpull');
    const codeAnalyzeRaw  = items.filter(item => item.category === 'code_analyze');

    const codeAnalyze = (() => {
    const arr = [...codeAnalyzeRaw];

    // desc/description 안의 "existing_holders_check: true" 같은 패턴까지 함께 검색
    const findIndexByFeatureKey = (featureKey) =>
        arr.findIndex((it) => {
        if (it.key === featureKey || it.name === featureKey) return true;

        const d = (it.desc || it.description || '').toString().trim();
        // "existing_holders_check: true" 처럼 앞부분이 featureKey 인 경우
        return d.startsWith(`${featureKey}:`);
        });

    const idxExisting = findIndexByFeatureKey('existing_holders_check');
    const idxTrading  = findIndexByFeatureKey('trading_suspend_check');

    if (idxExisting !== -1 && idxTrading !== -1 && idxExisting > idxTrading) {
        const [existingItem] = arr.splice(idxExisting, 1);
        arr.splice(idxTrading, 0, existingItem);
    }

    return arr;
    })();

    const CategoryCard = ({ title, items }) => {
    if (!items || !items.length) return null;

    // RugPull 숫자 뱃지 포맷 (소수점 2자리, 반올림 X, 잘라내기)
    const formatRugpullBadge = (featureKey, rawValueStr) => {
    const DECIMAL_KEYS = new Set([
        'reserve_base_drop_frac',       // Base 잔액 직전 대비 감소율
        'reserve_quote_drop_frac',      // Quote 잔액 직전 대비 감소율
        'price_ratio',                  // 가격 비율
        'time_since_last_mint_sec',     // 마지막 민팅 이후 경과 시간
        'liquidity_age_days',           // LP 생성 이후 경과 일수
        'reserve_quote_drawdown_global' // 전체 기간 Quote 잔액 감소율
    ]);

    if (!DECIMAL_KEYS.has(featureKey)) return rawValueStr;

    const num = parseFloat(rawValueStr);
    if (!Number.isFinite(num)) return rawValueStr;

    // 🔥 반올림 대신 2자리에서 잘라내기
    const truncated = Math.trunc(num * 100) / 100;

    return truncated.toFixed(2);
    };


    // Code Analyze 뱃지 안 텍스트 매핑
    const formatCodeBadge = (featureKey, rawValueStr) => {
    const valueStr = String(rawValueStr).trim();
    if (!featureKey) return valueStr;

    // 1️⃣ 매도 실패 타입: sell_fail_type_1/2/3  (가장 먼저 처리)
    if (featureKey.startsWith('sell_fail_type')) {
        const FAIL_LABEL = {
        '0': '판매 성공',
        '1': '구매 실패',
        '2': '유동성 부족',
        '3': 'sell tax',
        '4': 'revert',
        };
        return FAIL_LABEL[valueStr] || valueStr;
    }

    // 2️⃣ 매수 테스트: buy_1/2/3
    if (featureKey.startsWith('buy_')) {
        return valueStr === 'true' ? '매수 성공' : '매수 실패';
    }

    // 3️⃣ 매도 테스트: sell_1/2/3 또는 sell_result_1/2/3
    if (
        (featureKey.startsWith('sell_') &&
        !featureKey.startsWith('sell_fail_type')) || // 안전장치
        featureKey.startsWith('sell_result')
    ) {
        return valueStr === 'true' ? '매도 성공' : '매도 실패';
    }

    // 4️⃣ 나머지는 값 그대로
    return valueStr;
    };


    return (
        <div className="category-card">
        <h3 className="category-title">{title}</h3>
        <ul className="category-list">
            {items.map((raw, idx) => {
            const item = raw || {};

            const description = item.desc || item.description || '';

            // 1) value 우선 순위: value / val / description에서 파싱
            let value = item.value ?? item.val;

            if (value === undefined && typeof description === 'string') {
                const m = description.match(/:\s*(.+)$/); // "buy_1: false" -> "false"
                if (m) value = m[1];
            }

            const hasValue =
                value !== undefined &&
                value !== null &&
                String(value).trim() !== '';

            const valueStr = hasValue ? String(value).trim() : '';

            // 🔥 핵심: description 앞부분에서 featureKey 추출
            const featureKey =
                item.key ||
                item.name ||
                (typeof description === 'string' && description.includes(':')
                    ? description.split(':')[0].trim()
                    : undefined);

            const label =
                (featureKey && FEATURE_KO_LABEL[featureKey]) ||
                item.label ||
                featureKey ||
                `지표 ${idx + 1}`;

            // 원래 값 (true/false/0/1/2...)
            const rawValueStr = valueStr;

            // Code Analyze 섹션일 때만 한글 매핑
            const badgeText =
            title === 'Code Analyze'
                ? formatCodeBadge(featureKey, rawValueStr)
                : title === 'RugPull Pattern'
                ? formatRugpullBadge(featureKey, rawValueStr)
                : rawValueStr;

            // 색상 클래스는 기존 로직 그대로 (true=초록, false=빨강 등)
            const isTrue = rawValueStr === 'true' || value === true;
            const isFalse = rawValueStr === 'false' || value === false;
            const badgeClass = isTrue
            ? 'badge-true'
            : isFalse
            ? 'badge-false'
            : 'badge-default';

            return (
                <li key={item.key || idx} className="category-item">
                <div className="item-main">
                    <span className="item-label">{label}</span>

                    {hasValue && (
                        <span className={`item-badge ${badgeClass}`}>
                            {badgeText}
                        </span>
                    )}
                </div>

                {description && <p className="item-desc">{description}</p>}
                </li>
            );
            })}
        </ul>
        </div>
    );
    };

    return (
        <div>
            <div className="victim-header">
                <h3>Visitor Insights</h3>
                <span className="victim-count"></span>
            </div>
            
            <CategoryCard 
                title="Honeypot Pattern (Top 5)" 
                items={honeypotPattern}
            />
            
            <CategoryCard 
                title="RugPull Pattern" 
                items={rugpullPattern}
            />

            <CategoryCard 
                title="Code Analyze" 
                items={codeAnalyze}
            />
        </div>
    );
}