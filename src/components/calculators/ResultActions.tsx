type ResultActionsProps = {
  resultName: string;
};

export default function ResultActions({ resultName }: ResultActionsProps) {
  function printResult() {
    window.print();
  }

  return (
    <div className="result-actions" aria-label={`${resultName} export actions`}>
      <style>{`
        .result-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #d9e2ec;
        }

        .result-action-btn {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 0.62rem 0.9rem;
          font: inherit;
          font-weight: 750;
          cursor: pointer;
        }

        .result-action-print {
          border: 0;
          background: #155e75;
          color: #fff;
        }

        @media print {
          .result-actions {
            display: none;
          }
        }
      `}</style>

      <button
        type="button"
        className="result-action-btn result-action-print"
        onClick={printResult}
      >
        Print or Save as PDF
      </button>
    </div>
  );
}
