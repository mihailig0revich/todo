import PropTypes from 'prop-types';
import './footer.css';

function Footer({ delComplited, compliteCount, setActive, activeBtn }) {
  const btnValue = ['All', 'Active', 'Completed'];
  return (
    <footer className="footer">
      <span className="todo-count">{compliteCount} items left</span>
      <ul className="filters">
        {btnValue.map((item) => {
          return (
            <li key={item}>
              <button type="button" onClick={() => setActive(item)} className={activeBtn === item ? 'selected' : ''}>
                {item}
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={delComplited} type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  delComplited: PropTypes.func.isRequired,
  compliteCount: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  activeBtn: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
};

export default Footer;
