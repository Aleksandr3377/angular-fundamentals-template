import { render } from '@testing-library/angular';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
    it('should create', async () => {
        const view = await render(CoursesComponent, {
            imports: [CoursesComponent],
        });
        expect(view.fixture.componentInstance).toBeTruthy();
    });

    it('should render content', async () => {
        const view = await render(CoursesComponent, {
            imports: [CoursesComponent],
        });
        expect(view.getByText('Courses')).toBeTruthy();
    });
});
