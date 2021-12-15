import {RepeatedWordType} from '../legacy/types';

type MainDataStructure = {
repeatedWords: RepeatedWordType[];
}

export interface MainRepository {
get(): Promise<MainDataStructure | null>;
set(data: MainDataStructure): Promise<boolean>;
}

export class MainRepositoryImpl implements MainRepository {
private readonly keyInStorage = 'main_data_structure';

async get() {
  const json = window.localStorage.getItem(this.keyInStorage);
  if (!json) {
    return null;
  }

  let data : MainDataStructure | null = null;
  try {
    data = JSON.parse(json);
  } finally {
    return data;
  }
}

async set(data: MainDataStructure) {
  const json = JSON.stringify(data);
  window.localStorage.setItem(this.keyInStorage, json);
  return true;
}
}
