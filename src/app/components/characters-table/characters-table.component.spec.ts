import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharactersTableComponent } from './characters-table.component';
import { RicknmortyapiService } from '../../services/ricknmortyapi.service';
import { of } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';

describe('CharactersTableComponent', () => {
  let component: CharactersTableComponent;
  let fixture: ComponentFixture<CharactersTableComponent>;
  let httpMock: HttpTestingController;
  let apiServiceMock: jasmine.SpyObj<RicknmortyapiService>;

  const mockData: ApiResponse = {
    hasNextPage: true,
    hasPreviousPage: false,
    characters: [{ "id": 1, "name": "Rick Sanchez1", "status": "Alive1", "species": "Human1", "image": "1.jpeg" }]
  };

  beforeEach(async () => {
    const mock = jasmine.createSpyObj('RicknmortyapiService', ['getNextPage', 'getPreviousPage']);
    mock.getNextPage.and.returnValue(of(mockData));
    mock.getPreviousPage.and.returnValue(of(mockData));

    await TestBed.configureTestingModule({
      imports: [CharactersTableComponent, HttpClientTestingModule],
      providers: [
        { provide: RicknmortyapiService, useValue: mock }
      ]
    })
    .compileComponents();
    
    apiServiceMock = TestBed.inject(RicknmortyapiService) as jasmine.SpyObj<RicknmortyapiService>;
    fixture = TestBed.createComponent(CharactersTableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set data after ngOnInit resolves', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.hasNextPage).toBe(mockData.hasNextPage);
    expect(component.hasPreviousPage).toBe(mockData.hasPreviousPage);
    expect(component.characters).toBe(mockData.characters);
  }));

  it('should call the api getNextPage method on fetchNextPage', fakeAsync(() => {
    component.fetchNextPage();
    tick();
    expect(apiServiceMock.getNextPage).toHaveBeenCalledTimes(2);
  }));

  it('should call the api getPreviousPage method on fetchPreviousPage', fakeAsync(() => {
    component.fetchPreviousPage();
    tick();
    expect(apiServiceMock.getPreviousPage).toHaveBeenCalledTimes(1);
  }));

  it('should has the required structure', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelectorAll('button').length).toBe(4);
    expect(compiled.querySelectorAll('div.row').length).toBe(3);
    expect(compiled.querySelector('div > div.row:first-child > div').classList.contains('col-6')).toBeTrue();
    expect(compiled.querySelector('div > div.row:last-child > div').classList.contains('col-6')).toBeTrue();
  });

  it('buttons should have the required classes', () => {
      const allButtons: NodeListOf<HTMLLIElement> = fixture.nativeElement.querySelectorAll('button');
      expect(allButtons.length).toBe(4);
      let allHaveClasses = true;

      allButtons.forEach((button) => {
        if (!button.classList.contains('btn') || !button.classList.contains('btn-primary')) {
          allHaveClasses = false;
        }
      });


      expect(allHaveClasses).toBeTrue();
  });

  it('should enable/disable the Previous Page button', () => {
      component.hasPreviousPage = true;
      fixture.detectChanges();
      
      const buttons = fixture.nativeElement.querySelectorAll('div > div.row > button:first-child');
      expect(buttons[0].disabled).toBeFalse();
      expect(buttons[1].disabled).toBeFalse();

      component.hasPreviousPage = false;
      fixture.detectChanges();
      expect(buttons[0].disabled).toBeTrue();
      expect(buttons[1].disabled).toBeTrue();
  });

  it('should enable/disable the Next Page button', () => {
      component.hasNextPage = true;
      fixture.detectChanges();
      
      const buttons = fixture.nativeElement.querySelectorAll('div > div.row > button:last-child');
      expect(buttons[0].disabled).toBeFalse();
      expect(buttons[1].disabled).toBeFalse();

      component.hasNextPage = false;
      fixture.detectChanges();
      expect(buttons[0].disabled).toBeTrue();
      expect(buttons[1].disabled).toBeTrue();
  });

  it('should call fetchPreviousPage when Previous Page is clicked', () => {
      component.hasPreviousPage = true;
      fixture.detectChanges();
      spyOn(component, 'fetchPreviousPage');
      const buttons = fixture.nativeElement.querySelectorAll('div > div.row > button:first-child');
      buttons[0].click();
      buttons[1].click();
      
      expect(component.fetchPreviousPage).toHaveBeenCalled();
      expect(component.fetchPreviousPage).toHaveBeenCalledTimes(2);
  });

  it('should call fetchNextPage when Next Page is clicked', () => {
      component.hasNextPage = true;
      fixture.detectChanges();
      spyOn(component, 'fetchNextPage');
      const buttons = fixture.nativeElement.querySelectorAll('div > div.row > button:last-child');
      buttons[0].click();
      buttons[1].click();
      
      expect(component.fetchNextPage).toHaveBeenCalled();
      expect(component.fetchNextPage).toHaveBeenCalledTimes(2);
  });
});
