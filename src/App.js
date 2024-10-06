import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'; 
import AnagramCheck from './infografias/AnagramCheck';
import CheckForPalindrome from './infografias/CheckForPalindrome';
import FindDuplicatesInArray from './infografias/FindDuplicatesInArray';
import FindMinimumAndMaximumInArray from './infografias/FindMinimumAndMaximumInArray';
import ReverseAString from './infografias/ReverseAString';
import StringLength from './infografias/StringLength';
import TwoSumProblem from './infografias/TwoSumProblem';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {}
        <Route path="/Anagram_Check" element={<AnagramCheck />} /> {}
        <Route path="/Check_for_Palindrome" element={<CheckForPalindrome />} /> {}
        <Route path="/Find_Duplicates_in_an_Array" element={<FindDuplicatesInArray />} /> {}
        <Route path="/Find_Minimum_and_Maximum_in_Array" element={<FindMinimumAndMaximumInArray />} /> {}
        <Route path="/Reverse_a_String" element={<ReverseAString />} /> {}
        <Route path="/String_Length" element={<StringLength />} /> {}
        <Route path="/Two_Sum_Problem" element={<TwoSumProblem />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
