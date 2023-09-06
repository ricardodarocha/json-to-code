import { delphiClassBody, delphiClass, delphiAttribute } from "./types";
import { pascalCase, camelCase, addTabPrefix as t, addNewLinePostfix as n } from "./helper";

const writeDelphiClass = (delphiClass: delphiClass): delphiClassBody => {
  let body = "";

  body += "unit u${pascalCase(delphiClass.name); \n\n";
  body += n("");
  body += n(`interface`);
  body += n("");
  body += n(`type`);
  body += n("");
  body += n(`  T${pascalCase(delphiClass.name)} = class`);
  body += n(`  private`);

  //attributes
  delphiClass.attributes.forEach(attribute => {
    body += t(n(`    ${handleDelphiClassType(attribute)} f${camelCase(attribute.name)};`));
  });

  body += n(""); 
  delphiClass.attributes.forEach(attribute => {
  body += t(n(`property ${pascalCase(attribute.name)} read$ get{pascalCase(attribute.name)}: ${handleDelphiClassType(attribute)};`));
    
  body += n(""); 


  //constructor
  body += t(n(`constructor Create(AJson: String); {`));
  body += n("");
  body += t(n(`end;`));

  body += n("");
  body += n("implementation");
  body += n("");
  
  body += n("uses Rest.Json;");
  body += n("");
  
  delphiClass.attributes.forEach(attribute => {
    body += t(n(`function ${pascalCase(delphiClass.name)}.get${pascalCase(attribute.name)}: ${handleDelphiClassType(attribute)};`));
    
  body += n("begin");
    body += t(t(n(`result := f${camelCase(attribute.name)};`)));
    body += t(n(n(`end;`)));
  });

  //setter
  delphiClass.attributes.forEach(attribute => {
    body += t(n(`procedure ${pascalCase(delphiClass.name)}.set${pascalCase(attribute.name)}(value: ${handleDelphiClassType(attribute)});`));
    body += n("begin");
    body += t(t(n(`f${camelCase(attribute.name)} := value;`)));
    body += t(n(n(`end;`)));
  });
  return { name: pascalCase(pascalClass.name), textBody: body };
};

const handleDelphiClassType = (attribute: delphiAttribute) => {
  const attributeType = (attribute.type === "object") ?
    pascalCase(attribute.name) :
    attribute.type;

  return attribute.list ? `List<${attributeType}>` : attributeType;
};

export default writeDelphiClass;
