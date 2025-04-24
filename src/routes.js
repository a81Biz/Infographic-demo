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
import PrimeNumberCheck from './infografias/PrimeNumberCheck';
import CICDFlowDiagram from './infografias/CICDFlowDiagram';

const routes = [
  { path: "/Anagram_Check", name: "Anagram Check", component: AnagramCheck },
  { path: "/Check_Palindrome", name: "Check Palindrome", component: CheckPalindrome },
  { path: "/Find_Duplicates_in_an_Array", name: "Find Duplicates", component: FindDuplicatesInArray },
  { path: "/Find_Minimum_and_Maximum_in_Array", name: "Min & Max in Array", component: FindMinAndMaxInArray },
  { path: "/Reverse_a_String", name: "Reverse String", component: ReverseAString },
  { path: "/String_Length", name: "String Length", component: StringLength },
  { path: "/Two_Sum_Problem", name: "Two Sum Problem", component: TwoSumProblem },
  { path: "/Remove_Duplicates_For_Sorted_Array", name: "Remove Duplicates", component: RemoveDuplicatesForSortedArray },
  { path: "/Bubble_Sort", name: "Bubble Sort", component: BubbleSort },
  { path: "/Linear_Search", name: "Linear Search", component: LinearSearch },
  { path: "/Simple_Sorting_In_SQL", name: "Sorting in SQL", component: SimpleSortingInSQL },
  { path: "/Filtering_In_MongoDB", name: "Filtering in MongoDB", component: FilteringInMongoDB },
  { path: "/Prime_Number_Check", name: "Prime Number Check", component: PrimeNumberCheck },
  { path: "/CI_CD_Flow", name: "CI/CD Flow", component: CICDFlowDiagram },
];

export default routes;
