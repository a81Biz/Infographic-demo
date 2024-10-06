import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'; 
import Anagram_Check from './infografias/Anagram_Check'; 
import Check_for_Palindrome from './infografias/Check_for_Palindrome';
import Find_Duplicates_in_an_Array from './infografias/Find_Duplicates_in_an_Array'
import Find_Minimum_and_Maximum_in_Array from './infografias/Find_Minimum_and_Maximum_in_Array'
import Reverse_a_String from './infografias/Reverse_a_String'
import String_Length from './infografias/String_Length'
import Two_Sum_Problem from './infografias/Two_Sum_Problem'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {}
        <Route path="/Anagram_Check" element={<Anagram_Check />} /> {}
        <Route path="/Check_for_Palindrome" element={<Check_for_Palindrome />} /> {}
        <Route path="/Find_Duplicates_in_an_Array" element={<Find_Duplicates_in_an_Array />} /> {}
        <Route path="/Find_Minimum_and_Maximum_in_Array" element={<Find_Minimum_and_Maximum_in_Array />} /> {}
        <Route path="/Reverse_a_String" element={<Reverse_a_String />} /> {}
        <Route path="/String_Length" element={<String_Length />} /> {}
        <Route path="/Two_Sum_Problem" element={<Two_Sum_Problem />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
