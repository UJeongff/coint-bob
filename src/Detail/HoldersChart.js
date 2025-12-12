// HoldersChart.js
import './HoldersChart.css';

function HoldersChart({ token }) {
  const totalHolders = token.totalHolders ?? token.holders?.length ?? 0;

    // ✅ holders에 표시용 퍼센트 문자열을 미리 붙여두기
    const holders = (token.holders ?? []).map((h) => {
    let valueStr;

    if (Number.isFinite(h.percentage)) {
        const raw = h.percentage;
        // 🔹 반올림 없이 소수 둘째 자리까지: 양수는 floor, 음수는 ceil
        const truncated =
        raw >= 0
            ? Math.floor(raw * 100) / 100
            : Math.ceil(raw * 100) / 100;

        valueStr = `${truncated.toFixed(2)}%`;
    } else {
        valueStr = `${h.percentage}%`;
    }

    return { ...h, formattedPercentage: valueStr };
    });

  // ✅ 이 토큰에서 가장 긴 퍼센트 문자열 길이 찾기
  const maxLabelLen = holders.reduce(
    (max, h) => Math.max(max, (h.formattedPercentage || '').length),
    0
  );

  // ✅ 글자 수 기준으로 ch 단위 폭 계산 (여유 1ch, 최소 6ch)
  const percentageColWidthCh = Math.max(maxLabelLen + 1, 6);

  return (
    <div className="holders-chart">
      <h3 className="card-title">
        Holders{totalHolders ? ` (Top 20 token holders)` : ''}
      </h3>
      <div className="holders-scroll">
        {holders.map((holder) => (
          <div className="holder-item" key={holder.rank}>
            <span className="holder-address">{holder.address}</span>

            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${holder.barPercentage}%` }}
              />
            </div>

            {/* ✅ 퍼센트 칸은 토큰마다 동일 폭(ch 단위) */}
            <span
              className="holder-percentage"
              style={{ width: `${percentageColWidthCh}ch` }}
            >
              {holder.formattedPercentage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HoldersChart;
