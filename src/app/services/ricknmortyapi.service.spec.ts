import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RicknmortyapiService } from './ricknmortyapi.service';

describe('RicknmortyapiService', () => {
  let service: RicknmortyapiService;
  let httpMock: HttpTestingController;
  const mockData = { 
    info: { next: "myNextUrl", prev: "myPreviousUrl"  },
    results: [
      { "id": 1, "name": "Rick Sanchez1", "status": "Alive1", "species": "Human1", "image": "1.jpeg", "unmapped": "value" },
      { "id": 2, "name": "Rick Sanchez2", "status": "Alive2", "species": "Human2", "image": "2.jpeg", "unmapped": "value" },
      { "id": 3, "name": "Rick Sanchez3", "status": "Alive3", "species": "Human3", "image": "3.jpeg", "unmapped": "value" },
      { "id": 4, "name": "Rick Sanchez4", "status": "Alive4", "species": "Human4", "image": "4.jpeg", "unmapped": "value" },
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RicknmortyapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should map navigation urls', () => {
    service.getNextPage().subscribe();
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);

    expect(service.nextUrl).toBe(mockData.info.next);
    expect(service.previousUrl).toBe(mockData.info.prev);
  });

  it('should return hasNextPage as false', () => {
    mockData.info.next = "";
    service.getNextPage().subscribe(response => expect(response.hasNextPage).toBeFalse());
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should return hasNextPage as true', () => {
    mockData.info.next = "MyMockUrl";
    service.getNextPage().subscribe(response => expect(response.hasNextPage).toBeTrue());
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should return hasPreviousPage as false', () => {
    mockData.info.prev = "";
    service.getNextPage().subscribe(response => expect(response.hasPreviousPage).toBeFalse());
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should return hasPreviousPage as true', () => {
    mockData.info.prev = "MyMockUrl";
    service.getNextPage().subscribe(response => expect(response.hasPreviousPage).toBeTrue());
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should call api with nextUrl when no empty', () => {
    service.nextUrl = "mymockurl"
    service.getNextPage().subscribe();
    const request = httpMock.expectOne(service.nextUrl);
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should call api with previousUrl when no empty', () => {
    service.previousUrl = "mymockurl"
    service.getPreviousPage().subscribe();
    const request = httpMock.expectOne(service.previousUrl);
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should call api with Default Url when nextUrl is empty', () => {
    service.nextUrl = ""
    service.getNextPage().subscribe();
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should call api with Default Url when previousUrl is empty', () => {
    service.previousUrl = ""
    service.getPreviousPage().subscribe();
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should extract character information from response', () => {
    let mockCharacter: any = { id: 100, name: "TestName", status: "TestStatus", species: "TestSpecies", image: "TestImage", unmapped: "some value" };
    mockData.results = [ mockCharacter ];
    service.getPreviousPage().subscribe(response => {
      expect(response.characters.length).toBe(1);
      let character = response.characters[0];
      expect(character.id).toBe(mockCharacter.id);
      expect(character.name).toBe(mockCharacter.name);
      expect(character.status).toBe(mockCharacter.status);
      expect(character.species).toBe(mockCharacter.species);
      expect(character.image).toBe(mockCharacter.image);
    });
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });
});
