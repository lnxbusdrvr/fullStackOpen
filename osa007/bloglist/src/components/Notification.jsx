import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(({notification}) => notification)
  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  if (!notification)
    return null;

  return (
    <div data-testid='notifier' style={notificationStyle}>
      {notification}
    </div>
  );
};


export default Notification;

