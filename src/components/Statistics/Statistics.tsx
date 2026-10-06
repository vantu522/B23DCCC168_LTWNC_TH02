import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { isOverdue } from "../../utils/excercise";

const Statistics = () => {
  const { exercises } = useAppSelector((state) => state.exercises);

  const stats = useMemo(() => {
    let completed = 0;
    let overdue = 0;
    let pending = 0;
    const bySubject: Record<string, number> = {};

    exercises.forEach((ex) => {
      // Đếm theo trạng thái
      if (ex.excerciseStatus === "COMPLETED") {
        completed++;
      } else if (isOverdue(ex)) {
        overdue++;
      } else {
        pending++;
      }

      // Đếm theo môn học
      const subject = ex.subject || "Khác";
      if (!bySubject[subject]) {
        bySubject[subject] = 0;
      }
      bySubject[subject]++;
    });

    return { completed, overdue, pending, bySubject, total: exercises.length };
  }, [exercises]);

  return (
    <div className="statistics-container" style={{ marginBottom: "2rem", padding: "1.5rem", borderRadius: "12px", background: "var(--card-bg, white)", border: "1px solid var(--border-color, #cbd5e1)", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
      <h2 style={{ marginTop: 0, marginBottom: "1rem", color: "var(--text-color, #1e293b)" }}>📊 Thống kê bài tập</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ padding: "1rem", borderRadius: "8px", background: "#f8fafc", textAlign: "center", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>{stats.total}</div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Tổng số bài tập</div>
        </div>
        <div style={{ padding: "1rem", borderRadius: "8px", background: "#f0fdf4", textAlign: "center", border: "1px solid #bbf7d0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#16a34a" }}>{stats.completed}</div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Đã hoàn thành</div>
        </div>
        <div style={{ padding: "1rem", borderRadius: "8px", background: "#fef2f2", textAlign: "center", border: "1px solid #fecaca" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#dc2626" }}>{stats.overdue}</div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Quá hạn</div>
        </div>
        <div style={{ padding: "1rem", borderRadius: "8px", background: "#fffbeb", textAlign: "center", border: "1px solid #fde68a" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#d97706" }}>{stats.pending}</div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Đang thực hiện</div>
        </div>
      </div>

      <h3 style={{ marginBottom: "0.5rem", color: "var(--text-color, #1e293b)" }}>📚 Theo môn học</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {Object.entries(stats.bySubject).map(([subject, count]) => (
          <div key={subject} style={{ padding: "0.5rem 1rem", borderRadius: "999px", background: "var(--bg-color, #f1f5f9)", border: "1px solid var(--border-color, #cbd5e1)", fontSize: "0.9rem" }}>
            <span style={{ fontWeight: "500", color: "var(--text-color, #334155)" }}>{subject}</span>
            <span style={{ marginLeft: "0.5rem", background: "#3b82f6", color: "white", padding: "2px 8px", borderRadius: "999px", fontSize: "0.8rem" }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
