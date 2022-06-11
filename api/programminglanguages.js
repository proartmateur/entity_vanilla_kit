export class ProgrammingLanguages {
  constructor() {
    this.items = [
      {
        id: 1,
        attributes: {
          name: 'php',
          version: 8,
          versions_compatible: {
            min: 7.4,
            max: 8.1,
          },
          end_support_year: 2024,
          createdAt: '2022-06-04T07:26:24.207Z',
          updatedAt: '2022-06-05T14:39:11.225Z',
          lang_types: {
            uid: 'string',
            str: 'string',
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
            date: null,
            date_time: null,
            time: null,
          },
          logo: {
            data: {
              id: 1,
              attributes: {
                name: 'PHP-logo.svg',
                alternativeText: 'PHP-logo.svg',
                caption: 'PHP-logo.svg',
                width: null,
                height: null,
                formats: null,
                hash: 'PHP_logo_ca755c929d',
                ext: '.svg',
                mime: 'image/svg+xml',
                size: 10.32,
                url: '/uploads/PHP_logo_ca755c929d.svg',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
                createdAt: '2022-06-04T07:19:42.086Z',
                updatedAt: '2022-06-04T07:19:42.086Z',
              },
            },
          },
        },
      },
      {
        id: 9,
        attributes: {
          name: 'typescript',
          version: 4,
          versions_compatible: {
            min: 4,
            max: 4.3,
          },
          end_support_year: 2025,
          createdAt: '2022-06-05T14:47:25.864Z',
          updatedAt: '2022-06-05T14:47:25.864Z',
          lang_types: {},
          emptys: {},
          logo: {
            data: {
              id: 1,
              attributes: {
                name: 'PHP-logo.svg',
                alternativeText: 'PHP-logo.svg',
                caption: 'PHP-logo.svg',
                width: null,
                height: null,
                formats: null,
                hash: 'PHP_logo_ca755c929d',
                ext: '.svg',
                mime: 'image/svg+xml',
                size: 10.32,
                url: '/uploads/PHP_logo_ca755c929d.svg',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
                createdAt: '2022-06-04T07:19:42.086Z',
                updatedAt: '2022-06-04T07:19:42.086Z',
              },
            },
          },
        },
      },
      {
        id: 11,
        attributes: {
          name: 'psudo-php',
          version: 10,
          versions_compatible: {
            min: 7.4,
            max: 8.1,
          },
          end_support_year: 2024,
          createdAt: '2022-06-10T04:56:13.949Z',
          updatedAt: '2022-06-10T04:56:13.949Z',
          lang_types: {
            uid: 'string',
            str: 'string',
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
            date: null,
            date_time: null,
            time: null,
          },
          logo: {
            data: null,
          },
        },
      },
    ];
    this.items_clean = this.items.map((x) => ProgrammingLanguages.mapPl(x));
  }

  static mapPl(pl) {
    const { attributes } = pl;
    return {
      id: pl.id,
      name: attributes.name,
      version: attributes.version,
      versions_compatible: { ...attributes.versions_compatible },
      end_support_year: attributes.end_support_year,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
      lang_types: { ...attributes.lang_types },
      emptys: { ...attributes.emptys },
      logo: attributes.logo?.data?.attributes?.url,
    };
  }

  list() {
    return this.items_clean;
  }

  findById(id) {
    for (let item of this.items_clean) {
      if (item.id === id) {
        return item;
      }
    }
    return {};
  }

  findByEndSupportYear(end_support_year) {
    for (let item of this.items_clean) {
      if (item.end_support_year === end_support_year) {
        return item;
      }
    }
    return {};
  }

  findByName(name) {
    let result = [];
    for (let item of this.items_clean) {
      if (item.name.includes(name)) {
        result.push(item);
      }
    }
    return result;
  }

  delete(id) {
    this.items_clean = this.items_clean.filter((x) => x.id !== id);
  }

  create(programminglanguage) {
    const index = this.items_clean[this.items_clean.length - 1].id;
    programminglanguage['id'] = index + 1;
    this.items_clean.push(programminglanguage);
  }

  update(id, payload) {
    delete payload.id;
    const keys = Object.keys(payload);
    const item = this.findById(id);

    for (let key of keys) {
      item[key] = payload[key];
    }

    for (let i = 0; i < this.items_clean.length; i++) {
      if (this.items_clean[i].id === id) {
        this.items_clean[i] = JSON.parse(JSON.stringify(item));
        break;
      }
    }
  }
}
