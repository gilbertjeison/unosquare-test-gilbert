import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCardComponent } from './character-card.component';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should initialize by default character', () => {
    expect(component.character).toBeDefined();
    expect(component.character.id).toBe(0);
    expect(component.character.name).toBe("");
    expect(component.character.status).toBe("");
    expect(component.character.species).toBe("");
    expect(component.character.image).toBe("");
  });

  it('should show character properties', () => {
    let mockCharacter = { id: 1, name: "MockName", status: "MockStatus", species: "MockSpecies", image: "Test.png" };
    component.character = mockCharacter;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('div h5').textContent).toBe(mockCharacter.name);
    expect(compiled.querySelector('div ul li span').textContent).toBe(mockCharacter.status);
    expect(compiled.querySelector('div ul li:last-child').textContent).toContain(mockCharacter.species);
    expect(compiled.querySelector('div img').src).toContain(mockCharacter.image);
  });

  it('should have card main classes', () => {
    const compiled = fixture.nativeElement;
    const mainDiv = compiled.querySelector('div');

    expect(mainDiv.classList.contains('card')).toBeTrue();
    expect(mainDiv.classList.contains('mr-3')).toBeTrue();
    expect(mainDiv.classList.contains('mb-3')).toBeTrue();
  });

  it('should have img setted up', () => {
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');

    expect(img.classList.contains('card-img-top')).toBeTrue();
    expect(img.alt).toBe("Character Image");
  });

  it('should have card body classes', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('div.card-body h5');

    expect(compiled.querySelector('div.card-body')).toBeDefined();
    expect(title.classList.contains('card-title')).toBeTrue();
  });

  it('should have the unorder list classes', () => {
    const compiled = fixture.nativeElement;
    const list = compiled.querySelector('ul');

    expect(list.classList.contains('list-group')).toBeTrue();
    expect(list.classList.contains('list-group-flush')).toBeTrue();
  });

  it('should have the list item classes', () => {
    const compiled = fixture.nativeElement;
    const listItems: NodeListOf<HTMLLIElement> = compiled.querySelectorAll('ul li');
    expect(listItems.length).toBe(2);
    let allHaveClass = true;
    
    listItems.forEach((li) => {
      if (!li.classList.contains('list-group-item')){
        allHaveClass = false;
      }
    });

    expect(allHaveClass).toBeTrue();
  });

  it('should have the span classes', () => {
    const compiled = fixture.nativeElement;
    const span = compiled.querySelector('span');

    expect(span.classList.contains('badge')).toBeTrue();
    expect(span.classList.contains('badge-pill')).toBeTrue();
    expect(span.classList.contains('badge-dark')).toBeTrue();
  });
});
