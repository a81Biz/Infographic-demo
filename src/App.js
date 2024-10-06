import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'; 
import AnagramCheck from './infografias/AnagramCheck';
import CheckPalindrome from './infografias/CheckPalindrome';
import FindDuplicatesInArray from './infografias/FindDuplicatesInArray';
import FindMinAndMaxInArray from './infografias/FindMinAndMaxInArray';
import ReverseAString from './infografias/ReverseAString';
import StringLength from './infografias/StringLength';
import TwoSumProblem from './infografias/TwoSumProblem';
import RemoveDuplicatesForSortedArray from './infografias/RemoveDuplicatesForSortedArray';
import BubbleSort from './infografias/BubbleSort';
import LinearSearch from './infografias/LinearSearch';
import SimpleSortingInSQL from './infografias/SimpleSortingInSQL';
import FilteringInMongoDB from './infografias/FilteringInMongoDB';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {}
        <Route path="/Anagram_Check" element={<AnagramCheck />} /> {}
        <Route path="/Check_Palindrome" element={<CheckPalindrome />} /> {}
        <Route path="/Find_Duplicates_in_an_Array" element={<FindDuplicatesInArray />} /> {}
        <Route path="/Find_Minimum_and_Maximum_in_Array" element={<FindMinAndMaxInArray />} /> {}
        <Route path="/Reverse_a_String" element={<ReverseAString />} /> {}
        <Route path="/String_Length" element={<StringLength />} /> {}
        <Route path="/Two_Sum_Problem" element={<TwoSumProblem />} /> {}
        <Route path="/Remove_Duplicates_For_Sorted_Array" element={<RemoveDuplicatesForSortedArray />} /> {}
        <Route path="/Bubble_Sort" element={<BubbleSort />} /> {}
        <Route path="/Linear_Search" element={<LinearSearch />} /> {}
        <Route path="/Filtering_In_MongoDB" element={<FilteringInMongoDB />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
