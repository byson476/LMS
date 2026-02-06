
-- Sample data for table courses
INSERT INTO COURSE (courseId,title,description,tutorid) VALUES (COURSE_ID_SEQ.NEXTVAL,'Quickstart Core Java','Core Java Programming','guard2');
INSERT INTO COURSE (courseId,title,description,tutorid) VALUES (COURSE_ID_SEQ.NEXTVAL,'Quickstart Spring','Enterprise App Development using Spring','guard2');
INSERT INTO COURSE (courseId,title,description,tutorid) VALUES (COURSE_ID_SEQ.NEXTVAL,'MyBatis Premier','MyBatis  framework','guard2');
INSERT INTO COURSE (courseId,title,description,tutorid) VALUES (COURSE_ID_SEQ.NEXTVAL,'Database Modeling','Oracle Database Modeling','guard2');
INSERT INTO COURSE (courseId,title,description,tutorid) VALUES (COURSE_ID_SEQ.NEXTVAL,'Java Tutorial ','Java Tutorial for Complete Beginners','guard2');
INSERT INTO COURSE (courseId,title,description,tutorid) VALUES (COURSE_ID_SEQ.NEXTVAL,'Core JavaScript ','Core JavaScript Guide','guard2');

-- Sample data for table COURSE_ENROLLMENT
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-01', 'YYYY-MM-DD'),'guard1',1);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-02', 'YYYY-MM-DD'),'guard1',2);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-03', 'YYYY-MM-DD'),'guard1',3);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,2,TO_DATE('2023-01-04', 'YYYY-MM-DD'),'guard1',4);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,2,TO_DATE('2023-01-05', 'YYYY-MM-DD'),'guard1',5);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,3,TO_DATE('2023-01-06', 'YYYY-MM-DD'),'guard1',6);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-07', 'YYYY-MM-DD'),'guard1',1);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-08', 'YYYY-MM-DD'),'guard1',2);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-09', 'YYYY-MM-DD'),'guard1',3);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-10', 'YYYY-MM-DD'),'guard1',4);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-11', 'YYYY-MM-DD'),'guard1',5);
INSERT INTO COURSE_ENROLLMENT (enrollmentId,status,enrolled_date, studentid, courseid) VALUES(ENROLLMENT_ID_SEQ.NEXTVAL,1,TO_DATE('2023-01-12', 'YYYY-MM-DD'),'guard1',6);




commit;

