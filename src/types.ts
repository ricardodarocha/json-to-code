export type attributeType = "String" | "int" | "float" | "boolean" | "object" | "list" | null;
export type delphiattributeType = "String" | "integer" | "Extended" | "boolean" | "TObject" | "TArray<" | null;

export type javaAttribute = {
  name: string,
  type: attributeType,
  list: boolean
};

export type delphiAttribute = {
  name: string,
  type: delphiattributeType,
  list: boolean
};

export type javaClass = {
  name: string,
  attributes: javaAttribute[]
};
export type delphiClass = {
  name: string,
  attributes: delphiattribute[]
};


export type rawDataEntity = {
  name: string,
  rawData: any
};

export type javaClassBody = {
  name: string,
  textBody: string
};

export type delphiClassBody = {
  name: string,
  textBody: string
};
