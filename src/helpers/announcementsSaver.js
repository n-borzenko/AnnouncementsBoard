import announcementsKeys from "../constants/announcementsKeys";
import { setToStorage, getFromStorage, removeFromStrorage } from "./storage";

export const saveAnnouncements = (data, id) => {
  if (data.values[id] && data.values[id].photo) {
    setToStorage(announcementsKeys.photo + id, data.values[id].photo, true);
  }
  const values = Object.values(data.values).reduce(
    (newValues, { photo, ...props }) => {
      newValues[props.id] = props;
      return newValues;
    },
    {}
  );
  setToStorage(announcementsKeys.list, { ...data, values });
  if (!data.values[id]) {
    removeFromStrorage(announcementsKeys.photo + id);
  }
};

export const readAnnouncements = () => {
  const data = getFromStorage(announcementsKeys.list, {
    ids: [],
    values: {}
  });

  Object.keys(data.values).forEach(id => {
    data.values[id].lastUpdate = new Date(data.values[id].lastUpdate);
    data.values[id].photo = getFromStorage(
      announcementsKeys.photo + id,
      null,
      true
    );
  });
  return data;
};
