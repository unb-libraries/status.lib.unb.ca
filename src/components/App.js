import Site from './Site'

function App() {
  const specs = [
    'datasets_spec.js',
  ]

  return (
    <ul className="site-list list-group">
      {specs.map(spec => {
        return <li key={spec}>
            <Site spec={spec} />
          </li>
      })}
    </ul>
  );
}

export default App;
