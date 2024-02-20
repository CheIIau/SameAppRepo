import { ChangeValueDirective } from './change-value.directive';

describe('ChangeValueDirective', () => {
	it('should create an instance', () => {
        const inputElemenent = document.createElement("input");
        const elementRef = {nativeElement: inputElemenent}
		const directive = new ChangeValueDirective(elementRef);
		expect(directive).toBeTruthy();
	});
});
