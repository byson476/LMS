import { useEffect, useState, useCallback } from 'react';
import { useUserContext } from '../context/UserContext';

import * as courseApi from '../api/courseApi';

export const useCourselist = (initialCourselist = []) => {

  const { loginUser } = useUserContext();
  const userId = loginUser?.userId;

  const [courseListItems, setCourseListItems] = useState(initialCourselist);

  const fetchCourseList = useCallback(async () => {
    if (!userId) {
      setCourseListItems([]);
      return;
    }
    try {
      const responseJsonObject = await courseApi.courseList(userId);
      if (responseJsonObject?.status === 1) {
        console.log("useCourse - fetchCourseList - responseJsonObject: ", responseJsonObject);
        const data = responseJsonObject.data ?? [];
        const normalized = data.map((item) => ({
          courseId: item.courseId,
          title: item.title,
          description: item.description,
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