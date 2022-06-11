// Import stylesheets
import './style.css';

import {
  entity,
  EntityTemplate,
  FieldTemplate,
  TypesApi,
  DynamicTypeDefinitions,
  GenericEntityTemplater,
} from 'entity-definition-syntax-1';

import { Api } from './api/fake';

console.log(Api.ProgrammingLanguages.list());
console.log(Api.ProgrammingLanguages.findById(11));
console.log(Api.ProgrammingLanguages.findByName('php'));
console.log(Api.ProgrammingLanguages.findByEndSupportYear(2025));
Api.ProgrammingLanguages.delete(11);
console.log(Api.ProgrammingLanguages.list());

const new_pl = {
  name: 'python',
  version: 2.7,
  versions_compatible: {
    min: 2.7,
    max: 2.9,
  },
  end_support_year: 2010,
  lang_types: {
    uid: 'str',
    str: 'str',
    email: 'EmailVO',
    curp: 'CurpVO',
    rfc: 'RfcVO',
    id: 'int',
    int: 'int',
    uint: 'int',
    long: 'int',
    float: 'float',
    double: 'float',
    date: 'DateTime',
    date_time: 'DateTime',
    time: 'DateTime',
  },
  emptys: {
    uid: '',
    str: '',
    email: '',
    curp: '',
    rfc: '',
    id: '-1',
    int: '-1',
    uint: '-1',
    long: '-1',
    float: '1.0',
    double: '1.0',
    date: 'None',
    date_time: 'None',
    time: 'None',
  },
};

Api.ProgrammingLanguages.create(new_pl);
Api.ProgrammingLanguages.update(9, {
  end_support_year: 2026,
  versions_compatible: {
    min: 0.4,
    max: 1.8,
  },
});

console.log(Api.ProgrammingLanguages.list());

console.log('--Frameworks');
console.log(Api.Frameworks.list());

const bt_form_template = () => {
  const lang = {
    name: 'typescript',
    version: 4.0,
  };
  return new EntityTemplate(
    `
<form>
    <h1>Crear $CLASS_NAME$</h1>
$F_FORM_INPUTS$

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
    `,
    lang,
    {
      name: 'bootstrap',
      version: 5,
      language_name: lang.name,
    },
    'backend'
  );
};

const bt_form_inputs_template = () => {
  return new FieldTemplate(
    `<div class="form-group">
      <p>HookTemplates: $F_LIMITS$,  $F_NULLABLE$  $F_UNIQUE$</p>
        <label for="$SNAKE_NAME$_$F_NAME$">$F_NAME$</label>
        <input type="$F_TYPE$" class="form-control" id="$SNAKE_NAME$_$F_NAME$" aria-describedby="$SNAKE_NAME$ $F_NAME$" placeholder="Enter $F_NAME$">
        <small id="$F_NAME$Help" class="form-text text-muted">We'll never share your $F_NAME$ with anyone else.</small>
    </div>\n`,
    '$F_FORM_INPUTS$',
    '\n',
    'show',
    false
  );
};

const example_entity = () => {
  return `_|dto|repo user_profile user_profiles
- agent:SalesAgent _ A
- email:!email 
- uid:uid 
- name:str 3,160 
+ name2:str 190 
- age:?int 90 
- credit:?float
- rfc:rfc
- start_at:?date_time
`;
};

(async () => {
  const lang = {
    name: 'html_forms',
    version: 5.0,
  };

  const api = new TypesApi();
  const primitiveTypes = await api.primitiveTypes(lang);
  const emptyVals = await api.empty(lang);
  const typeDefinitions = new DynamicTypeDefinitions(emptyVals, primitiveTypes);

  const entity_template = bt_form_template();

  //get get flield templates
  const field_templates = [bt_form_inputs_template()];

  const raw_entity = example_entity(); // Write in the UI
  const ent = entity(raw_entity);

  const unique_template = (unique) => {
    return unique ? 'uniqueness' : '-';
  };

  const nullable_template = (nullable) => {
    return nullable ? 'nulesito' : '';
  };

  const limits_template = (limits) => {
    const no_limits = limits.min === -1 && limits.max === -1;

    if (no_limits) {
      return '';
    }
    const min = limits.min === -1 ? 0 : limits.min;

    return `Límites (${min}, ${limits.max})`;
  };

  const templater = new GenericEntityTemplater(
    ent,
    entity_template,
    field_templates,
    typeDefinitions,
    unique_template,
    nullable_template,
    limits_template
  );

  const r = templater.render();
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `<h1>${ent.class_name}</h1>`;
  appDiv.innerHTML = `<p>${r}</p>`;
})();
