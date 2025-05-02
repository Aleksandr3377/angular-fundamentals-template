import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {UserService} from "@app/user/services/user.service";

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrieve the user', (done) => {
        const dummyUser = { id: 1, name: 'Test User' };

        service.getCurrentUser().subscribe((user: any) => {
            expect(user).toEqual(dummyUser);
            done();
        });

        const req = httpMock.expectOne('http://localhost:4000/api/users/me');
        expect(req.request.method).toBe('GET');
        req.flush(dummyUser);
    });
});
