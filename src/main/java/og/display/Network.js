class Node {
    constructor(id, label, params) {
        this.id = id;
        this.label = label;
        this.messageLabel = label;
        this.params = params;
        this.contacts = [];
        this.colorbg = "#FFFFFF";
        this.colorborder = "#648FC9";
        this.listPropertiesToDraw = [];
        this.dftColorbg = "#97c2fc";
        this.dftColorborder = "#648FC9";
        this.size = 25;
        this.hidden = false;
        this.shape = "ellipse";
        this.borderWidth = 2;
        this.mass = 1;
        this.label = undefined;
    }


    processParams(visnetwork, network) {
        let currentNode = this;
        Object.keys(this.params).forEach(function (key) {
            network.allProps.push(key)
            if (key == 'background color') {
                currentNode.setColor(visnetwork, currentNode.params[key]);
            } else if (key == 'color.border') {
                currentNode.setBorderColor(visnetwork, currentNode.params[key]);
            } else if (key == 'image') {
                currentNode.setImage(visnetwork, currentNode.params[key]);
            } else if (key == 'hidden') {
                currentNode.setHidden(visnetwork, currentNode.params[key]);
            } else if (key == 'borderWidth') {
                currentNode.setBorderWitdh(visnetwork, currentNode.params[key]);
            } else if (key == 'mass') {
                currentNode.setMass(visnetwork, currentNode.params[key]);
            } else if (key == 'label') {
                currentNode.setLabel(visnetwork, currentNode.params[key]);
            } else if (key == 'shape') {
                currentNode.setShape(visnetwork, currentNode.params[key]);
            } else if (key == 'size') {
                currentNode.setSize(visnetwork, currentNode.params[key]);
            } else {
                network.unknowProps.push(key);
            }
        })

    }

    calcRandomColorByID() {
        let hashCode = function (s) {
            var h = 0, i = s.length;
            while (i >= 0)
                h = (h << 5) - h + (s.charCodeAt(--i) | 0);
            return h;
        };
        let hashId = hashCode(this.id.toString() + this.label);

        let c = {
            r: (hashId & 255).toString(16),
            g: ((hashId >> 8) & 255).toString(16),
            b: ((hashId >> 16) & 255).toString(16),
            getColor: function () {
                return "#" + (this.r.length == 1 ? "0" + this.r : this.r) +
                    (this.g.length == 1 ? "0" + this.g : this.g) +
                    (this.b.length == 1 ? "0" + this.b : this.b);
            }
        }

        return c.getColor();
    }


    setColor(visnetwork, colorbg, colorborder) {
        //this.colorbg = colorbg;
        //this.colorborder = colorborder;
        // console.log("hellloooo" , this.id, colorbg, colorborder);
        //setColorNodeNetwork (visnetwork, this.id, this.colorbg, this.colorborder);
        this.setBackgroundColor(visnetwork, colorbg);
        this.setBorderColor(visnetwork, colorborder);
    }

    setDefaultColor(visnetwork) {
        this.colorbg = /*this.calcRandomColorByID()*/"#FFFFFF";
        this.colorborder = "#648FC9";

        this.setBackgroundColor(visnetwork, this.colorbg);
        this.setBorderColor(visnetwork, this.colorborder);
    }

    setDefaultBackgroundColor(visnetwork) {
        this.colorbg = this.calcRandomColorByID();
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            color: {
                background: this.colorbg
            }
        });
    }

    setDefaultBorderColor(visnetwork) {
        this.colorborder = this.dftColorborder;
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            color: {
                border: this.colorborder
            }
        });
    }

    setSize(visnetwork, size) {
        let unsizableShapes = ["image", "circularImage", "diamond", "dot", "star", "triangle", "triangleDown", "hexagon", "square", "icon"];
        this.size = parseInt(size);
        console.log(this.size)
        if (this.shape in unsizableShapes) {
            visnetwork.body.data.nodes.updateOnly({
                id: this.id,
                scaling: {
                    min: this.size,
                    max: this.size
                },
                value: this.size
            });
        } else {
            visnetwork.body.data.nodes.updateOnly({
                id: this.id,
                size: this.size
            });
        }
    }

    setImage(visnetwork, image) {
        this.image = image;
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            image: this.image
        });
    }

    setHidden(visnetwork, hidden) {
        this.hidden = (hidden === 'true'); //support hidden as a string
        console.log(this.hidden)
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            hidden: this.hidden
        });
    }

    setShape(visnetwork, shape) {
        this.shape = shape;
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            shape: this.shape
        });
    }

    setBorderWitdh(visnetwork, borderWidth) {
        this.borderWidth = borderWidth;
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            borderWidth: this.borderWidth
        });
    }

    setMass(visnetwork, mass) {
        this.mass = mass;
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            mass: this.mass
        });
    }

    setLabel(visnetwork, label) {
        this.label = label;
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            label: this.label
        });
    }


    setBackgroundColor(visnetwork, color) {
        if (color != "#000000") {

            this.colorbg = color;
            visnetwork.body.data.nodes.updateOnly({
                id: this.id,
                color: {
                    background: color
                }
            });
        }

    }

    setBorderColor(visnetwork, color) {
        this.colorborder = color;
        visnetwork.body.data.nodes.updateOnly({
            id: this.id,
            color: {
                border: color
            }
        });
    }

    linkTo(node) {
        if (this.contacts.includes(node)) {
            return false;
        }
        this.contacts.push(node);
    }

    getNode() {
        return {
            id: this.id,
            label: this.label,
            value: 20
        }
    }

    getContacts() {
        let res = [];
        this.contacts.forEach((contact) => {
            res.push({
                from: this.id,
                to: contact.id,
                arrows: {
                    to: {
                        type: "arrow",
                        enabled: true
                    }
                }
            });
        });
        return res;
    }

    drawInformation(ctx, x, y, scale, color = "black") {
        ctx.save();
        ctx.fillStyle = color;
        var visibleFontSize = 16 * scale;

        // console.log(scale, visibleFontSize);
        (visibleFontSize > 25) ? visibleFontSize = 25 / scale : visibleFontSize = 16;
        ctx.font = visibleFontSize + "px Arial";

        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillText(this.messageLabel, x, y);

        this.listPropertiesToDraw.forEach((property) => {
            ctx.font = "italic" + visibleFontSize * 0.7 + "px Arial";
        });
        ctx.restore();
    }
}

class Link {
    constructor(nfrom, nto, id, label, params) {
        this.from = nfrom;
        this.to = nto;
        this.id = id;
        this.params = params;
        this.arrowtype = "arrow";
        this.dashes = false;
        this.directed = false;
        this.color = '#848484';
        this.arrowImage = undefined;
        this.mass = 1;
        this.label = label;
        this.scale = 1;
        this.width = 1;
    }

    processParams(visnetwork, network) {
        let currentEdge = this;
        Object.keys(this.params).forEach(function (key) {
            network.allProps.push(key)
            if (key == 'arrow type') {
                currentEdge.setArrowType(visnetwork, currentEdge.params[key]);
            } else if (key == 'dashes') {
                currentEdge.setDashes(visnetwork, currentEdge.params[key]);
            } else if (key == 'directed') {
                currentEdge.setDirected(visnetwork, currentEdge.params[key]);
            } else if (key == 'color') {
                currentEdge.setColor(visnetwork, currentEdge.params[key]);
            } else if (key == 'arrow image') {
                currentEdge.setArrowImage(visnetwork, currentEdge.params[key]);
            } else if (key == 'mass') {
                currentEdge.setMass(visnetwork, currentEdge.params[key]);
            } else if (key == 'label') {
                currentEdge.setLabel(visnetwork, currentEdge.params[key]);
            } else if (key == 'arrow scale') {
                currentEdge.setScale(visnetwork, currentEdge.params[key]);
            } else if (key == 'width') {
                currentEdge.setWidth(visnetwork, currentEdge.params[key]);
            } else {
                network.unknowProps.push(key);
            }
        })
    }

    setArrowType(visnetwork, arrowtype) {
        this.arrowtype = arrowtype;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            arrows: {
                to: {
                    type: this.arrowtype
                }
            }
        });
    }

    setDashes(visnetwork, dashes) {
        this.dashes = dashes;
        if (typeof this.dashes === 'boolean') {
            visnetwork.body.data.edges.updateOnly({
                id: this.id,
                dashes: (this.dashes != false) //TODO refaire
            });
        } else if (this.dashes instanceof Array) {
            visnetwork.body.data.edges.updateOnly({
                id: this.id,
                dashes: this.dashes //TODO refaire
            });
        }
    }

    setDirected(visnetwork, directed) {
        this.directed = directed;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            arrows: {
                to: {
                    enabled: (this.directed === 'true')
                }
            }
        });
    }

    setColor(visnetwork, color) {
        this.color = color;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            color: this.color
        });
    }

    setArrowImage(visnetwork, arrowImage) {
        this.arrowImage = arrowImage;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            arrows: {
                to: {
                    src: this.arrowImage,
                    type: 'image',
                    imageHeight: this.width*40,
                    imageWidth: this.width*40
                }
            }
        });
    }

    setMass(visnetwork, mass) {
        this.mass = mass;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            mass: this.mass
        });
    }

    setLabel(visnetwork, label) {
        this.label = label;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            label: this.label
        });
    }

    setScale(visnetwork, scale) {
        this.scale = scale;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            scaling: {
                min: this.scale,
                max: this.scale,
                customScalingFunction: function (min, max, total, value) {
                    if (max === min) {
                        return 0.5;
                    } else {
                        var scale = 1 / (max - min);
                        return Math.max(0, (value - min) * scale);
                    }
                }
            },
            value:this.scale
        });
    }

    setWidth(visnetwork, width) {
        this.width = width;
        visnetwork.body.data.edges.updateOnly({
            id: this.id,
            width: this.width
        });
    }
}

class Network {
    constructor() {
        this.listNodes = [];
        this.listEdges = [];
        this.visEdges = null;
        this.visNodes = null;
        this.unknowProps = [];
        this.allProps = [];
    }

    addNode(label, params) {
        let ID;
        //this.listNodes.length > 0 ? ID = this.listNodes[this.listNodes.length - 1].id + 1 : ID = 0;
        ID = label;
        let newNode = new Node(ID, label, params);
        //newNode.processParams(this)
        this.listNodes.push(newNode);
        return newNode;
    }

    linkNode(from, to, idd, params) {
        from.linkTo(to);
        let newLink = new Link(from, to, idd, idd, params);
        this.listEdges.push(newLink);
    }

    getNode(ID) {
        let res = null;
        this.listNodes.forEach((node) => {
            if (node.id == ID) {
                res = node;
                return;
            }
        })
        return res;
    }

    getNodeFromLabel(label) {
        let res = null;
        this.listNodes.forEach((node) => {
            if (node.label == label) {
                res = node;
                return;
            }
        })
        return res;
    }

    getIdFromLabel(name) {
        let res = null;
        this.listNodes.forEach((node) => {
            if (node.label == name) {
                res = node;
                return;
            }
        });
        return res;
    }

    getData() {
        let data = [];
        let link = [];
        this.listNodes.forEach((node) => {
            data.push(node.getNode());
            if (node.getContacts().length > 0) {
                link = link.concat(node.getContacts());
            }
        });

        this.visNodes = new vis.DataSet(data);
        this.visEdges = new vis.DataSet(link);
        return {
            nodes: this.visNodes,
            edges: this.visEdges
        }
    }

    getListNodes() {
        return this.listNodes;
    }

    getListEdges() {
        return this.listEdges;
    }

    getNodes() {
        return this.visNodes;
    }

    getEdges() {
        return this.visEdges;
    }
}

class EventVisnetwork {
    constructor(network, visnetwork, currentNode) {
        this.network = network;
        this.visnetwork = visnetwork;
        this.currentNode = currentNode;
        this.addEventSelectNode();
        this.addEventSelectLink();
        /*
                this.addEvent ("deselectNode", () => {

                });

                this.addEvent("deselectEdge", () => {

                });
         */
    }

    addEventSelectNode() {
        this.addEvent("selectNode", (params) => {
            this.currentNode.evSelectNode(params);
        });
    }

    addEventSelectLink() {
        this.addEvent("selectEdge", (params) => {

        });
    }

    addEvent(nameEvent, todo) {
        this.visnetwork.addEventListener(nameEvent, (params) => {
            console.log("EVENT " + nameEvent, params);
            todo(params);
        });
    }
}

function setColorNodeNetwork(network, idNode, backgroundColor, borderColor) {
    try {
        let node = network.body.nodes[idNode];
        let lastColorBorder = node.options.color.border;
        let lastColorBackground = node.options.color.background;
        node.options.color = {
            border: lastColorBorder,            // ces deux paramètres gèrent les couleurs des liens dépendants du noeud
            background: lastColorBackground,

            highlight: {
                border: borderColor,
                background: backgroundColor,
            },
            hover: {}
        }
    } catch (e) {
        console.log(e);
    }
}

function generateNetwork(nodes, edges) {

    let network = new Network();
    /*// création du graphique network à partir du JSON
    nodes.knownComponents.forEach((n) => {
        network.addNode (n.friendlyName, n);
    });

    nodes.knownComponents.forEach((n) => {
        n.neighbors.forEach((voisin) => {
            network.linkNode (network.getIdFromLabel (n.friendlyName), network.getIdFromLabel (voisin));
        });
    });*/
    nodes.forEach((n) => {
        network.addNode(n.id, n['props']);
    });
    edges.forEach((e) => {
        network.linkNode(network.getNode(e['from']), network.getNode(e['to']), e.id, e['props']);
    });
    return network;
}

// attention, main doit être un composant html natif, pas un composant jQuery
function createNetwork(container, network, options = {}, width = 600, height = 600) {
    let main = document.createElement("div");
    main.style.width = width + "px";
    main.style.height = height + "px";
    container.appendChild(main);

    let visnetwork = new vis.Network(main, network.getData(), options);

    visnetwork.on("afterDrawing", function (ctx) {
        network.getListNodes().forEach((node) => {
            let nodePosition = visnetwork.getPositions([node.id]);
            let colorGenerator = {
                r: parseInt(node.colorbg.substr(1, 2), 16) > 120 ? "00" : "ff",
                g: parseInt(node.colorbg.substr(3, 2), 16) > 120 ? "00" : "ff",
                b: parseInt(node.colorbg.substr(5, 2), 16) > 120 ? "00" : "ff",

                compute: function () {
                    if (this.r == "00" || this.g == "00" || this.b == "00") {
                        return "#000000";
                    }
                    return "#ffffff";
                }
            }

            node.drawInformation(ctx, nodePosition[node.id].x, nodePosition[node.id].y, visnetwork.getScale(), colorGenerator.compute());
        });
    });

    return visnetwork;
}