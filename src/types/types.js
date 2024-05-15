import PropTypes from 'prop-types';

export default function propTypesItem() {
  return {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    complited: PropTypes.bool,
    description: PropTypes.string,
    createdTime: PropTypes.number,
    created: PropTypes.string,
    editing: PropTypes.bool,
  };
}
