import React from 'react';
import { 
  GitPullRequest, 
  Check, 
  Rocket, 
  UserCheck, 
  Cherry, 
  GitMerge,
  Code
} from 'lucide-react';

const CICDFlowDiagram = () => {
  const Step = ({ icon: Icon, text, color }) => (
    <div className="flex flex-col items-center m-2 p-2 bg-gray-100 rounded-lg">
      <Icon color={color} size={24} />
      <span className="text-sm mt-1 text-center">{text}</span>
    </div>
  );

  const Arrow = () => (
    <div className="flex-grow border-t-2 border-gray-300 mx-2 my-auto" />
  );

  const EnvironmentBox = ({ title, children }) => (
    <div className="border-2 border-gray-300 rounded-lg p-4 m-2">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="flex flex-wrap justify-center">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">CI/CD Process for React Application</h2>
      
      <EnvironmentBox title="DEV Environment">
        <Step icon={Code} text="Code Entry in Feature Branch" color="#3498db" />
        <Arrow />
        <Step icon={GitPullRequest} text="PR and Code Review" color="#2ecc71" />
        <Arrow />
        <Step icon={Check} text="ESLint, Jest, Lighthouse CI" color="#f39c12" />
        <Arrow />
        <Step icon={GitMerge} text="Merge to DEV" color="#3498db" />
        <Arrow />
        <Step icon={Rocket} text="Deploy to DEV (DEV.sitio.com)" color="#3498db" />
      </EnvironmentBox>

      <EnvironmentBox title="QA Environment">
        <Step icon={Cherry} text="Cherry-Pick to QA" color="#9b59b6" />
        <Arrow />
        <Step icon={UserCheck} text="QA Review" color="#2ecc71" />
        <Arrow />
        <Step icon={Rocket} text="Deploy to QA (QA.sitio.com)" color="#9b59b6" />
      </EnvironmentBox>

      <EnvironmentBox title="UAT Environment">
        <Step icon={Cherry} text="Cherry-Pick to UAT" color="#e74c3c" />
        <Arrow />
        <Step icon={UserCheck} text="UAT Review" color="#2ecc71" />
        <Arrow />
        <Step icon={Rocket} text="Deploy to UAT (UAT.sitio.com)" color="#e74c3c" />
      </EnvironmentBox>

      <EnvironmentBox title="PROD Environment">
        <Step icon={GitMerge} text="Merge UAT to PROD" color="#1abc9c" />
        <Arrow />
        <Step icon={Rocket} text="Deploy to PROD (sitio.com)" color="#1abc9c" />
      </EnvironmentBox>
    </div>
  );
};

export default CICDFlowDiagram;
