import designCard from '../assets/images/designcard.png';
import durabilityCard from '../assets/images/durabilitycard.png';
import safetyCard from '../assets/images/sicurezzacard.png';
import silenceCard from '../assets/images/silencecard.png';
import dataCard from '../assets/images/datacard.png';
import traceabilityCard from '../assets/images/traceabilitycard.png';
import testingCard from '../assets/images/testingcard.png';
import reliabilityCard from '../assets/images/reliabilitycard.png';
import { Typography } from '@material-tailwind/react';

const categorys = [
  {
    id: 1,
    name: 'Progetazione avanzata',
    value: 'Design',
    path: designCard,
  },
  {
    id: 2,
    name: 'Materiale superiore',
    value: 'Durability',
    path: durabilityCard,
  },
  {
    id: 3,
    name: 'Aumentare la sicurezza',
    value: 'Safety',
    path: safetyCard,
  },
  {
    id: 4,
    name: 'Riduzione dal rumore',
    value: 'Silence',
    path: silenceCard,
  },
  {
    id: 5,
    name: 'Soluzioni per la manutenzione basata sulle condizioni',
    value: 'Data',
    path: dataCard,
  },
  {
    id: 6,
    name: 'Filierq soostenibile e resiliente',
    value: 'Traceability',
    path: traceabilityCard,
  },
  {
    id: 7,
    name: 'Test e validazione',
    value: 'Testing',
    path: testingCard,
  },
  {
    id: 8,
    name: 'Cura integrale della sala montata',
    value: 'Reliability',
    path: reliabilityCard,
  },
];

const Category = () => {
  return (
    <div>
      <Typography variant="h3" style={{ color: 'black', padding: '2rem' }}>
        Categories
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {categorys.map(category => (
          <div
            key={category.id}
            style={{
              backgroundImage: `url(${category.path})`,
              backgroundSize: 'contain',
              width: '85%',
              aspectRatio: 17 / 6,
              /*  backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100%',
                    padding: '3rem',*/
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Category;
