import { ExcerciseStatus, type Exercise } from "../types/excercise";


// export const isOverdue = (excercise: Exercise) =>{
//     if ( new Date(excercise.deadline) < new Date()){
//         return true
//     }
//     return false
// }

export const isOverdue = (exercise: Exercise): exercise is Exercise & {
    excerciseStatus: ExcerciseStatus.PENDING
} =>{
    if(typeof exercise !== 'object'){
        return false
    }
    return (
        exercise.excerciseStatus === ExcerciseStatus.PENDING &&
        new Date(exercise.deadline) < new Date()
    )

}

export const getDeadlineText = (deadline: string): string => {
  const now = new Date();
  const deadlineDate = new Date(deadline);

  const diffTime = deadlineDate.getTime() - now.getTime();

  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return `Quá hạn ${Math.abs(diffDays)} ngày`;
  }

  return `Còn ${diffDays} ngày`;
};
