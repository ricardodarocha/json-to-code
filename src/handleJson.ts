import { javaClass, delphiClass, rawDataEntity, delphiAttributeType, attributeType } from "./types";

const jsonToJava = (data: any, fileName: string): javaClass[] => {
  const classes: javaClass[] = [];
  const queue: rawDataEntity[] = [];

  queue.push({ name: fileName, rawData: data });

  while (queue.length) {
    const entity: rawDataEntity = queue.shift() as rawDataEntity;
    const javaClass: javaClass = { name: entity.name, attributes: [] };

    Object.keys(entity.rawData)
      .forEach((name: string) => {
        let value: any = entity.rawData[name];
        let type: attributeType = discoverTypeFromValue(value);
        const isList = type === "list";

        //Special case when it's a list. The type and value assumed must be the values of the list
        if (isList) {
          //In case it's a empty list, the attribute will be ignored
          if ((value as Array<any>).length === 0) {
            return;
          }

          type = discoverTypeFromValue(value[0]);
          value = structureObjectsInList(value);
        }

        //push attribute into the class
        javaClass.attributes.push({ name, type, list: isList });

        if (type === "object") {
          queue.push({ name, rawData: value });
        }
      });

    classes.push(javaClass);
  }

  return classes;
};

const structureObjectsInList = (rawData: any[]) => {
  let newUnifiedRawData = {};

  rawData.forEach(data => {
    newUnifiedRawData = { ...data, ...newUnifiedRawData };
  });

  return newUnifiedRawData;
};

const discoverTypeFromValue = (value: any): attributeType => {
  if (Array.isArray(value)) {
    return "list";
  }

  switch (typeof value) {
    case "object":
      return "object";

    case "number":
      return (value % 1 === 0) ? "int" : "float";

    case "string":
      return "String";

    case "boolean":
      return "boolean";
  }

  return null;
};

---------------------------------------------------------------------------

  
const jsonToDelphi = (data: any, fileName: string): delphiClass[] => {
  const classes: delphiClass[] = [];
  const queue: rawDataEntity[] = [];

  queue.push({ name: fileName, rawData: data });

  while (queue.length) {
    const entity: rawDataEntity = queue.shift() as rawDataEntity;
    const javaClass: delphiClass = { name: entity.name, attributes: [] };

    Object.keys(entity.rawData)
      .forEach((name: string) => {
        let value: any = entity.rawData[name];
        let type: attributeType = discoverTypeFromValue(value);
        const isList = type === "list";

        //Special case when it's a list. The type and value assumed must be the values of the list
        if (isList) {
          //In case it's a empty list, the attribute will be ignored
          if ((value as Array<any>).length === 0) {
            return;
          }

          type = discoverTypeFromValue(value[0]);
          value = structureObjectsInList(value);
        }

        //push attribute into the class
        delphiClass.attributes.push({ name, type, list: isList });

        if (type === "TObject") {
          queue.push({ name, rawData: value });
        }
      });

    classes.push(delphiClass);
  }

  return classes;
};

const structureObjectsInList = (rawData: any[]) => {
  let newUnifiedRawData = {};

  rawData.forEach(data => {
    newUnifiedRawData = { ...data, ...newUnifiedRawData };
  });

  return newUnifiedRawData;
};

const discoverTypeFromValue = (value: any): attributeType => {
  if (Array.isArray(value)) {
    return "list";
  }

  switch (typeof value) {
    case "object":
      return "TObject";

    case "number":
      return (value % 1 === 0) ? "Integer" : "Extended";

    case "string":
      return "String";

    case "boolean":
      return "boolean";
  }

  return null;
};

export default jsonToJava;
export default delphiToJava;
