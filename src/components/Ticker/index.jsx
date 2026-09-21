import React from 'react';

const Ticker = () => {
  const items = [
    'React.js', 'Node.js', 'AWS', 'Docker', 'Python', 'MongoDB',
    'CI/CD', 'JavaScript', 'Next.js', 'Firebase', 'Kotlin', 'MySQL',
    'Express.js', 'Git', 'Linux', 'Tailwind CSS',
  ];

  const tickerContent = items.map((item, i) => (
    <React.Fragment key={i}>
      <span>{item}</span><span className="hi"> · </span>
    </React.Fragment>
  ));

  return (
    <div className="ticker">
      <div className="ticker-inner">
        {tickerContent}
        {tickerContent}
      </div>
    </div>
  );
};

export default Ticker;
