import { useState } from "react";
import type { FormEvent } from "react";

import { Priority, type createExercise } from "../../types/excercise";
import { useExerciseListContext } from "./ExcerciseListText";

const AddExerciseForm = () => {
  const { addExercise } = useExerciseListContext();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<createExercise>({
    subject: "",
    name: "",
    deadline: "",
    priority: Priority.MEDIUM,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.name || !formData.deadline) return;
    addExercise(formData);
    setFormData({ subject: "", name: "", deadline: "", priority: Priority.MEDIUM });
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Nút mở popup */}
      <button className="btn-add" onClick={() => setIsOpen(true)}>
        + Thêm bài tập
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          {/* Ngăn click bên trong đóng modal */}
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Thêm bài tập mới</h2>
              <button className="btn-close-modal" onClick={handleClose}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="subject">Môn học</label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="VD: Lập trình Web"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Tên bài tập</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="VD: Bài tập HTML/CSS"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  id="deadline"
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Mức độ ưu tiên</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value={Priority.LOW}>Thấp</option>
                  <option value={Priority.MEDIUM}>Trung bình</option>
                  <option value={Priority.HIGH}>Cao</option>
                </select>
              </div>

              <div className="form-submit">
                <button type="button" className="btn-cancel" onClick={handleClose}>
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Thêm bài tập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddExerciseForm;