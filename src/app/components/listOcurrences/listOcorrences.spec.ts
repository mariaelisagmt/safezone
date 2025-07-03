import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOcorrences } from './listOcorrences';
import { OcurrenceService } from '../../services/occurrences.service';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { IOcurrence } from '../../interfaces/occurrence.interface';
import { IUser } from '../../interfaces/user.interface';

describe('ListOcorrences', () => {
  let component: ListOcorrences;
  let fixture: ComponentFixture<ListOcorrences>;
  let ocurrenceServiceSpy: jest.Mocked<OcurrenceService>;
  let userServiceSpy: jest.Mocked<UserService>;

  const mockOcurrences: IOcurrence[] = [
    {
      id: 1,
      title: 'Ocorrência 1',
      description: 'Descrição 1',
      latitude: 0,
      longitude: 0,
      type: 'type1',
      userId: 1,
      date: new Date(),
      address: 'Address 1',
    },
    {
      id: 2,
      title: 'Ocorrência 2',
      description: 'Descrição 2',
      latitude: 0,
      longitude: 0,
      type: 'type2',
      userId: 1,
      date: new Date(),
      address: 'Address 2',
    },
  ];

  const mockUser: IUser = {
    id: 1,
    email: 'test@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const ocurrenceServiceMock = {
      getOcurrencesByUser: jest.fn().mockReturnValue(of(mockOcurrences)),
    };
    const userServiceMock = {
      currentUser$: of(mockUser),
    };

    await TestBed.configureTestingModule({
      imports: [ListOcorrences],
      providers: [
        { provide: OcurrenceService, useValue: ocurrenceServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOcorrences);
    component = fixture.componentInstance;
    ocurrenceServiceSpy = TestBed.inject(OcurrenceService) as jest.Mocked<OcurrenceService>;
    userServiceSpy = TestBed.inject(UserService) as jest.Mocked<UserService>;

    localStorage.setItem('userId', '1');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load occurrences on ngOnInit', () => {
    expect(component.ocurrences).toEqual(mockOcurrences);
    expect(ocurrenceServiceSpy.getOcurrencesByUser).toHaveBeenCalledWith(1);
    expect(component.user).toEqual(mockUser);
  });

  it('should call alert when editarOcorrencia is called', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.ocurrences = mockOcurrences;
    component.editarOcorrencia(0);
    expect(window.alert).toHaveBeenCalledWith(`Editar ocorrência: ${mockOcurrences[0].title}`);
  });

  it('should remove occurrence when excluirOcorrencia is confirmed', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    component.ocurrences = [...mockOcurrences];
    component.excluirOcorrencia(0);
    expect(component.ocurrences.length).toBe(1);
    expect(component.ocurrences).toEqual([mockOcurrences[1]]);
  });

  it('should not remove occurrence when excluirOcorrencia is cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    component.ocurrences = [...mockOcurrences];
    component.excluirOcorrencia(0);
    expect(component.ocurrences.length).toBe(2);
    expect(component.ocurrences).toEqual(mockOcurrences);
  });
});
