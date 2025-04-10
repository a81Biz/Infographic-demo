import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'AM | Home Infografías'; 
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
        <p>Home Infografías</p>
    </div>
  );
}

export default Home;
