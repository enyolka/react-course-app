import React, { useContext, useState } from "react";

import { StoreContext } from "../../store/StoreProvider";
import CourseDetails from "./subcomponents/CourseDetails";
import CoursePopup from "./subcomponents/CoursePopup";

const AdminPanel = () => {
  const { courses } = useContext(StoreContext);

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsOpenPopup(false);
  };

  const coursesList = courses.map((course) => (
    <CourseDetails key={course.id} {...course} />
  ));
  return (
    <section>
      {coursesList}
      <button onClick={showPopup}>Dodaj nowy kurs</button>
      <CoursePopup
        isEditMode={false}
        isOpenPopup={isOpenPopup}
        hidePopup={hidePopup}
      />
    </section>
  );
};

export default AdminPanel;
