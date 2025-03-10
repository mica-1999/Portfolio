"use client";
import { formatNumber } from '/src/utils/mainContentUtil';

export default function BalanceSection({ balanceData, hidden, onToggleVisibility }) {
  // Process null/undefined values safely to prevent hydration issues
  const safeFormatNumber = (value) => {
    return formatNumber(value ?? 0);
  };

  return (
    <div className="d-flex col-lg-6 balance">
      <div className="card flex-grow-1">
        <div id="1" className={hidden ? 'blur_element' : ''}>
          <div className="card-header">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">Multibanco</h5>
              <div>
                <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={onToggleVisibility}></i>
              </div>
            </div>
            <h6 className="card-subtitle mb-2">Balance Overview</h6>
          </div>
          <div className="card-body d-flex justify-content-evenly flex-wrap p-0 mb-4">
            <div className="d-flex gap-2">
              <div className="d-flex justify-content-center align-items-center small-box">
                <i className="fa-solid fa-euro-sign fa-lg euro-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">{safeFormatNumber(balanceData.totalBalance)}</h5>
                <p className="mb-0">Total Balance</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <div className="d-flex justify-content-center align-items-center small-box-third">
                <i className="fa-solid fa-arrow-up fa-lg third-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">{safeFormatNumber(balanceData.balanceMonth)}</h5>
                <p className="mb-0">This Month</p>
              </div>
            </div>
            <div className="d-flex gap-2 p-0">
              <div className="d-flex justify-content-center align-items-center small-box-received">
                <i className="fa-solid fa-arrow-down fa-lg balance-received-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">{safeFormatNumber(balanceData.withdrawal)}</h5>
                <p className="mb-0">New Transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
