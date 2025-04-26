import { render } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    it('should create', async () => {
        const view = await render(HeaderComponent, {
            imports: [HeaderComponent],
        });
        expect(view.fixture.componentInstance).toBeTruthy();
    });

    it('should project content on the right side', async () => {
        const view = await render(
            `<app-header>
         <span>Right Side Content</span>
       </app-header>`, {
                imports: [HeaderComponent],
            });

        expect(view.getByText('Right Side Content')).toBeTruthy();
    });

    it('should project buttons on the right side', async () => {
        const view = await render(
            `<app-header>
         <button>Button 1</button>
         <button>Button 2</button>
       </app-header>`, {
                imports: [HeaderComponent],
            });

        expect(view.getByText('Button 1')).toBeTruthy();
        expect(view.getByText('Button 2')).toBeTruthy();
    });
});
