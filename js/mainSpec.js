describe('Williams-Sonama-Component', ()=> {
    let container = null;
    beforeEach ((done)=> {
        container = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = `<div id="modal">
                                    <div id="main"></div>
                                <div>
                                    <div class="backdrop" onclick="closeModal()"></div>
                                    <div class="container-inner"></div>
                                    </div>
                                </div>`;
        container.className = 'container';
        document.body.appendChild(container);
        onLoad(function callback(){
            done();
        });
    });
    it('should have the Container.', ()=> {
        const con = document.getElementsByClassName('container')[0];
        expect(container).toEqual(con);
    })
    it('Container should have Main.', ()=> {
        const con = document.getElementsByClassName('container')[0];
        expect(container.firstChild.id).toEqual("modal");
    })
    it('should mark item as complete', ()=> {
        const products = document.querySelector('#main > div');
        expect(typeof (products)).toEqual("object");
        expect(products.childNodes.length).toEqual(10);
    })

});