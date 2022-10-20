import {mount} from "@vue/test-utils";
import Highlighter from "@/components/Highlighter.vue";

describe("Highlighter", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Highlighter, {attachTo: document.body});
  });
  afterEach(() => wrapper.unmount());
  
  describe("renders correct elements", () => {
    it('should have a "source-text" textarea', () => {
      const sourceText = wrapper.find('[data-testid="source-text"]');
      expect(sourceText.exists()).toBe(true);
      expect(wrapper.findAll('[data-testid="source-text"]')).toHaveLength(1);
    });
    
    it('should have a "search-term" input', () => {
      const searchTerm = wrapper.find('[data-testid="search-term"]');
      expect(searchTerm.exists()).toBe(true);
      expect(wrapper.findAll('[data-testid="search-term"]')).toHaveLength(1);
    });
    
    it('should have a "result" element', () => {
      const result = wrapper.find('[data-testid="result"]');
      expect(result.exists()).toBe(true);
      expect(wrapper.findAll('[data-testid="result"]')).toHaveLength(1);
      expect(result.text()).toBe("");
    });
    
    it('should have a "case-sensitive" input checkbox', () => {
      const caseSensitive = wrapper.find('[data-testid="case-sensitive"]');
      expect(caseSensitive.exists()).toBe(true);
      expect(wrapper.findAll('[data-testid="case-sensitive"]')).toHaveLength(1);
    });
  });
  
  describe("responds correctly to all input behaviors", () => {
    it('should allow input on "source-text"', async () => {
      const sourceText = wrapper.find('[data-testid="source-text"]');
      await sourceText.setValue("hello world");
      expect(sourceText.element.value).toEqual("hello world");
    });
    
    it('should reflect changes to "result"', async () => {
      const sourceText = wrapper.find('[data-testid="source-text"]');
      await sourceText.setValue("hello world");
      const result = wrapper.find('[data-testid="result"]');
      expect(result.text()).toEqual("hello world");
      expect(result.html()).toContain("hello world");
    });
    
    it('should allow input on "search-term"', async () => {
      const searchTerm = wrapper.find('[data-testid="search-term"]');
      await searchTerm.setValue("o");
      expect(searchTerm.element.value).toEqual("o");
    });
    
    it('should highlight search results in "result"', async () => {
      const sourceText = wrapper.find('[data-testid="source-text"]');
      await sourceText.setValue("hello world");
      const searchTerm = wrapper.find('[data-testid="search-term"]');
      await searchTerm.setValue("o");
      const expected = "hell<mark>o</mark> w<mark>o</mark>rld";
      expect(wrapper.find('[data-testid="result"]').html()).toContain(expected);
    });
    
    it('should respond to changes on "source-text"', async () => {
      const sourceText = wrapper.find('[data-testid="source-text"]');
      await sourceText.setValue("hello world");
      expect(sourceText.element.value).toEqual("hello world");
      const text = "Hello world! Hello hellohello";
      await sourceText.setValue(text);
      expect(sourceText.element.value).toEqual(text);
    });
    
    it('should respond to changes on "search-term"', async () => {
      const searchTerm = wrapper.find('[data-testid="search-term"]');
      await searchTerm.setValue("o");
      expect(searchTerm.element.value).toEqual("o");
      await searchTerm.setValue("Hello");
      expect(searchTerm.element.value).toEqual("Hello");
    });
    
    it('should highlight substrings of "result" case-insensitively', async () => {
      const text = "Hello world! Hello hellohello";
      const sourceText = wrapper.find('[data-testid="source-text"]');
      await sourceText.setValue(text);
      const searchTerm = wrapper.find('[data-testid="search-term"]');
      await searchTerm.setValue("hello");
      const resultText = "<mark>Hello</mark> world! <mark>Hello</mark> <mark>hello</mark><mark>hello</mark>";
      expect(wrapper.find('[data-testid="result"]').html()).toContain(resultText);
    });
    
    it('should respond to checking "case-sensitive"', async () => {
      await wrapper.find('[data-testid="case-sensitive"]').trigger("click");
      expect(wrapper.find('[data-testid="case-sensitive"]').element.checked).toBe(true);
    });
    
    it('should highlight substrings of "result" case-sensitively', async () => {
      const text = "Hello world! Hello hellohello";
      const sourceText = wrapper.find('[data-testid="source-text"]');
      await sourceText.setValue(text);
      await wrapper.find('[data-testid="case-sensitive"]').trigger("click");
      expect(wrapper.find('[data-testid="case-sensitive"]').element.checked).toBe(true);
      const searchTerm = wrapper.find('[data-testid="search-term"]');
      await searchTerm.setValue("Hello");
      const resultText = "<mark>Hello</mark> world! <mark>Hello</mark> hellohello";
      expect(wrapper.find('[data-testid="result"]').html()).toContain(resultText);
    });
    
    it('should respond to checking "case-sensitive" multiple times', async () => {
      await wrapper.find('[data-testid="case-sensitive"]').trigger("click");
      expect(wrapper.find('[data-testid="case-sensitive"]').element.checked).toBe(true);
      await wrapper.find('[data-testid="case-sensitive"]').trigger("click");
      expect(wrapper.find('[data-testid="case-sensitive"]').element.checked).toBe(false);
    });
  });
});
