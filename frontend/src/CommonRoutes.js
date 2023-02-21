import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/Sidebar/Sidebar";
import DashBoard from "./Pages/DashBoard";
import OneLiners from "./Pages/OneLiner";
import Category from "./Pages/Category";
import Language from "./Pages/Language";
import Terminology from "./Pages/Terminology";
import ShortAndSimple from "./Pages/ShortAndSimple";
import ShortAndSimpleContent from "./Pages/ShortAndSimpleContent";
import ConceptsContent from "./Pages/ConceptsContent";
import NumericalTest from "./Pages/NumericalTest";
import NumericalTestContent from "./Pages/NumericalTestContent.js";
import PractiseTest from "./Pages/PractiseTest";
import PractiseTestContent from "./Pages/PractiseTestContent";
import ENotes from "./Pages/ENotes";
import Concepts from "./Pages/Concepts";
import VideoTutorial from "./Pages/VideoTutorial";
import Poster from "./Pages/Poster";
import MockTestContent from "./Pages/MockTestContent";
import MockTest from "./Pages/MockTest";
import ExamSyllabus from "./Pages/ExamSyllabus";
import LiveTest from "./Pages/LiveTest";
import LiveTestContent from "./Pages/LiveTestContent";
import Login from "./Pages/Auth/Login";
import { CartState } from "./Context";
import Utility from "./Pages/utility";

const CommonRoutes = () => {
  const { admin, setAdmin } = CartState();
  console.log("admin", admin);
  return (
    <>
      <SideBar />
      <Routes>
        {admin && admin.token ? (
          <Route path="/" element={<DashBoard />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        <Route path="/numericaltest/:id" element={<NumericalTestContent />} />
        <Route
          path="/one-liners"
          element={admin && admin.token ? <OneLiners /> : <Login />}
        />
        <Route
          path="/category"
          element={admin && admin.token ? <Category /> : <Login />}
        />
        <Route
          path="/language"
          element={admin && admin.token ? <Language /> : <Login />}
        />
        <Route
          path="/terminology"
          element={admin && admin.token ? <Terminology /> : <Login />}
        />
        <Route
          path="/short-and-simple"
          element={admin && admin.token ? <ShortAndSimple /> : <Login />}
        />
        <Route
          path="/short-and-simple/:id"
          element={<ShortAndSimpleContent />}
        />
        <Route path="/concepts/:id" element={<ConceptsContent />} />
        <Route
          path="/numericaltest"
          element={admin && admin.token ? <NumericalTest /> : <Login />}
        />

        <Route path="/practisetest/:id" element={<PractiseTestContent />} />
        <Route
          path="/practisetest"
          element={admin && admin.token ? <PractiseTest /> : <Login />}
        />
        <Route
          path="/enotes"
          element={admin && admin.token ? <ENotes /> : <Login />}
        />
        <Route
          path="/concepts"
          element={admin && admin.token ? <Concepts /> : <Login />}
        />
        <Route
          path="/video"
          element={admin && admin.token ? <VideoTutorial /> : <Login />}
        />
        <Route
          path="/poster"
          element={admin && admin.token ? <Poster /> : <Login />}
        />
        <Route
          path="/utility"
          element={admin && admin.token ? <Utility /> : <Login />}
        />

        <Route path="/mocktest/:id" element={<MockTestContent />} />
        <Route
          path="/mocktest"
          element={admin && admin.token ? <MockTest /> : <Login />}
        />
        <Route
          path="/exam-syllabus"
          element={admin && admin.token ? <ExamSyllabus /> : <Login />}
        />
        <Route path="/live-test/:id" element={<LiveTestContent />} />
        <Route
          path="/live-test"
          element={admin && admin.token ? <LiveTest /> : <Login />}
        />
      </Routes>
    </>
  );
};

export default CommonRoutes;
