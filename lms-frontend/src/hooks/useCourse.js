import { useEffect, useState, useCallback, useContext } from 'react';
import { useUserContext } from '../context/UserContext';
import { UserContext } from "../App";
import * as courseApi from '../api/courseApi';

export const useCourselist = (initialCourselist = []) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  console.log("useCourse - loginUser: ", loginUser);
  const userId = loginUser?.userId;
  //const userRole = loginUser?.userRole;
  const userRole = loginUser?.roleNames?.[0]; // Assuming the first role is the primary role
  const [courseListItems, setCourseListItems] = useState(initialCourselist);

  const fetchCourseList = useCallback(async () => {
    if (!userId) {
      setCourseListItems([]);
      return;
    }
    try {
      const responseJsonObject = await courseApi.courseList(userId, userRole);
      //const responseJsonObject = await courseApi.courseList(userId);
      console.log("useCourse - responseJsonObject.status: ", responseJsonObject.status);
      if (responseJsonObject?.status === 1) {
        console.log("useCourse - fetchCourseList - responseJsonObject: ", responseJsonObject);
        const data = responseJsonObject.data ?? [];
        const normalized = data.map((item) => ({
          courseId: item.courseId,
          title: item.title,
          description: item.description,
          tutorName: item.tutorName,  
          courseId: item.courseId,
          enrolledDate: item.enrolledDate,
          enrollmentId: item.enrollmentId,
        }));
        setCourseListItems(normalized);
      } else {
        setCourseListItems([]);
      }
    } catch (e) {
      setCourseListItems([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchCourseList();
  }, [fetchCourseList]);


  return { courseListItems};
};