import React, { useEffect, useContext, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Doughnut, getElementAtEvent } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Fleet.css'
import { useLanguage, translations } from '../components/LanguageContext';

ChartJS.register(
  ChartDataLabels
)

const timelineData = [
  { date: '1988-11-23', ship: 'Sovereign of the Seas' },
  { date: '1991-04-05', ship: 'Monarch of the Seas' },
  { date: '1992-12-07', ship: 'Majesty of the Seas' },
  { date: '1995-02-03', ship: 'Legend of the Seas' },
  { date: '1996-01-19', ship: 'Grandeur of the Seas' },
  { date: '1996-02-26', ship: 'Splendour of the Seas' },
  { date: '1997-11-22', ship: 'Rhapsody of the Seas' },
  { date: '1998-02-26', ship: 'Vision of the Seas' },
  { date: '1999-06-17', ship: 'Voyager of the Seas' },
  { date: '2000-04-12', ship: 'Explorer of the Seas' },
  { date: '2001-07-03', ship: 'Radiance of the Seas' },
  { date: '2001-11-28', ship: 'Adventure of the Seas' },
  { date: '2003-11-14', ship: 'Mariner of the Seas' },
  { date: '2003-11-21', ship: 'Serenade of the Seas' },
  { date: '2004-05-15', ship: 'Jewel of the Seas' },
  { date: '2006-12-19', ship: 'Freedom of the Seas' },
  { date: '2007-05-29', ship: 'Liberty of the Seas' },
  { date: '2008-05-08', ship: 'Independence of the Seas' },
  { date: '2009-10-24', ship: 'Oasis of the Seas' },
  { date: '2010-11-20', ship: 'Allure of the Seas' },
  { date: '2014-10-31', ship: 'Quantum of the Seas' },
  { date: '2015-04-26', ship: 'Anthem of the Seas' },
  { date: '2016-04-23', ship: 'Ovation of the Seas' },
  { date: '2016-05-29', ship: 'Harmony of the Seas' },
  { date: '2018-03-31', ship: 'Symphony of the Seas' },
  { date: '2019-04-20', ship: 'Spectrum of the Seas' },
  { date: '2021-07-31', ship: 'Odyssey of the Seas' },
  { date: '2022-03-22', ship: 'Wonder of the Seas' },
  { date: '2023-11-22', ship: 'Icon of the Seas' },
  { date: '2025-05-01', ship: 'Star of the Seas (Future)' },
  { date: '2026-11-15', ship: 'Utopia of the Seas II (Announced)' },
];

  


const Fleet = () => {
  const { language } = useLanguage();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const shipsByClass = {
      Oasis: ['Allure of the Seas','Harmony of the Seas','Oasis of the Seas','Symphony of the Seas','Wonder of the Seas','Utopia of the Seas'],
      Quantum: ['Anthem of the Seas','Odyssey of the Seas','Ovation of the Seas','Quantum of the Seas','Spectrum of the Seas'],
      Freedom: ['Freedom of the Seas','Independence of the Seas','Liberty of the Seas'],
      Voyager: ['Adventure of the Seas','Explorer of the Seas','Mariner of the Seas','Navigator of the Seas','Voyager of the Seas'],
      Radiance: ['Brilliance of the Seas','Jewel of the Seas','Radiance of the Seas','Serenade of the Seas'],
      Vision: ['Enchantment of the Seas','Grandeur of the Seas','Rhapsody of the Seas','Vision of the Seas'],
      Sovereign: ['Monarch of the Seas','Sovereign of the Seas'],
      Legacy: ['Splendour of the Seas'],
      Icon: ['Legend of the Seas (TBD)','Icon of the Seas','Star of the Seas']
    };

  useEffect(() => {
    
    const items = document.querySelectorAll('.timeline-item');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
        else e.target.classList.remove('visible');
      }),
      { threshold: 0.1 }
    );
    setClasses(Object.keys(shipsByClass));
    items.forEach(i => obs.observe(i));
    return () => items.forEach(i => obs.unobserve(i));
  }, []);

  // High-contrast palette for unique class colors
  const colors = [
    '#1f77b4', // blue
    '#ff7f0e', // orange
    '#2ca02c', // green
    '#d62728', // red
    '#9467bd', // purple
    '#8c564b', // brown
    '#e377c2', // pink
    '#7f7f7f', // gray
    '#17becf'  // cyan
  ];

  // Compute ship counts per class for donut chart
  const shipCounts = classes.map((className) => {
    const ships = shipsByClass[className] || [];
    return ships.length;
  });

  const donutData = {
    labels: classes.map(c => translations.ships.classes[c]?.[language] || c),
    datasets: [{
      data: shipCounts,
      backgroundColor: colors.slice(0, classes.length),
    }]
  };

  const donutOptions = {
    plugins: {
      datalabels: {
      color: '#fff',
      anchor: 'end',
      align: 'end',
      offset: 10,
      formatter: (value, ctx) => {
        return ctx.chart.data.labels[ctx.dataIndex];
      },
      borderColor: '#ccc',
      borderWidth: 1,
      backgroundColor: 'transparent',
      borderRadius: 4,
      padding: 10,
      callout: {
        display: true,
        side: 10,
        start: 0,
        end: 15
      },
    },
      
      legend: {
        display: false
      }
    },
    radius: '70%',
    cutout: '50%',
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'nearest',
      intersect: true
    },
  };

  return (
  <Container className="my-4">
    <Row>
      <Col className="info-section" md={8}>
        <h2>{translations.fleet.journeyTitle[language]}</h2>
        <p>{translations.fleet.journeyDescription[language]}</p>
        <Card>
          <h3>{translations.fleet.classDebutTitle[language]}</h3>
          <Card.Body>
            <Doughnut 
              data={donutData} 
              options={donutOptions} 
              style={{height: '600px', width: '600px'}}
              onClick={(event) => {
                const elements = getElementAtEvent(event);
                if (elements.length > 0) {
                  const index = elements[0].index;
                  const clickedClass = classes[index];
                  setSelectedClass(clickedClass);
                }
              }}
            />
          </Card.Body>
        </Card>
        {selectedClass && (
          <div style={{ marginTop: '2rem' }}>
            <h4>{translations.ships.classes[selectedClass]?.[language] || selectedClass}</h4>
            <ul>
              {shipsByClass[selectedClass].map((ship, idx) => (
                <li key={idx}>{ship}</li>
              ))}
            </ul>
          </div>
        )}
      </Col>
      <Col className="timeline-header" md={4}>
      <h2>{translations.fleet.timelineTitle[language]}</h2>
        <Card className="timeline-card">
          <Card.Body>
            <ul className="timeline">
              {timelineData.map((item, idx) => (
                <li key={idx} className="timeline-item">
                  <span className="timeline-date">{item.date}</span>
                  <span className="timeline-ship">{item.ship}</span>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default Fleet;