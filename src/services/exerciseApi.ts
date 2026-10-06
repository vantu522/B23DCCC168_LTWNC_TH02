import type { ApiResponse } from '../types/api';
import { ExcerciseStatus, Priority } from '../types/excercise';
import type { Exercise } from '../types/excercise';

const mockExercises: Exercise[] = [
  {
    id: 1,
    subject: 'Lập trình Web',
    name: 'Bài tập HTML/CSS cơ bản',
    deadline: '2026-09-20T23:59:00',
    priority: Priority.LOW,
    excerciseStatus: ExcerciseStatus.COMPLETED,
    createdAt: new Date('2026-09-10T08:00:00'),
  },
  {
    id: 2,
    subject: 'Cấu trúc dữ liệu và giải thuật',
    name: 'Cài đặt cây nhị phân tìm kiếm',
    deadline: '2026-09-22T23:59:00',
    priority: Priority.MEDIUM,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date('2026-09-11T14:30:00'),
  },
  {
    id: 3,
    subject: 'Cơ sở dữ liệu',
    name: 'Thiết kế ERD cho hệ thống quản lý thư viện',
    deadline: '2026-09-06T17:00:00',
    priority: Priority.LOW,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date('2026-09-12T09:15:00'),
  },
  {
    id: 4,
    subject: 'Lập trình hướng đối tượng',
    name: 'Project cuối kỳ',
    deadline: '2026-10-15T23:59:00',
    priority: Priority.HIGH,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date('2026-09-01T10:00:00'),
  },
  {
    id: 5,
    subject: 'Trí tuệ nhân tạo',
    name: 'Cài đặt thuật toán A*',
    deadline: '2026-09-18T23:59:00',
    priority: Priority.MEDIUM,
    excerciseStatus: ExcerciseStatus.COMPLETED,
    createdAt: new Date('2026-09-13T08:45:00'),
  },
  {
    id: 6,
    subject: 'Lập trình Web',
    name: 'Bài tập Javascript (DOM)',
    deadline: '2026-09-27T23:59:00',
    priority: Priority.MEDIUM,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date('2026-09-14T15:20:00'),
  },
  {
    id: 7,
    subject: 'Mạng máy tính',
    name: 'Mô phỏng mạng bằng Cisco Packet Tracer',
    deadline: '2026-09-24T12:00:00',
    priority: Priority.LOW,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date('2026-09-15T09:00:00'),
  },
  {
    id: 8,
    subject: 'Hệ điều hành',
    name: 'Bài tập quản lý bộ nhớ',
    deadline: '2026-09-28T23:59:00',
    priority: Priority.MEDIUM,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date('2026-09-10T10:30:00'),
  },
  {
    id: 9,
    subject: 'Toán rời rạc',
    name: 'Bài tập Đồ thị',
    deadline: '2026-09-19T17:00:00',
    priority: Priority.LOW,
    excerciseStatus: ExcerciseStatus.COMPLETED,
    createdAt: new Date('2026-09-12T07:15:00'),
  },
  {
    id: 10,
    subject: 'Cấu trúc dữ liệu và giải thuật',
    name: 'Cài đặt đồ thị và duyệt đồ thị',
    deadline: '2026-10-02T23:59:00',
    priority: Priority.MEDIUM,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date('2026-09-14T11:00:00'),
  }
];

export const getExercises = (): Promise<ApiResponse<Exercise[]>> => {
  return new Promise((resolve) => {
    // Giả lập độ trễ mạng 500ms
    setTimeout(() => {
      resolve({
        success: true,
        message:"Lấy danh sách bài tập thành công",
        data: mockExercises
      });
    }, 500);
  });
};
