package og;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.concurrent.ThreadLocalRandom;

/**
 * 
 * 345 color=blue size=15
 * 
 * 654 color=blue size=15
 * 
 * 345 654 label=just a stupid relation style=dashed directed=true
 * 
 * 
 * 
 * @author lhogie
 *
 */
public class OGLParser {
	public void parse(Graph g, Reader in) throws IOException {
		var bis = new BufferedReader(in);

		while (true) {
			var line = bis.readLine();

			if (line == null) {
				return;
			}

			if (line.startsWith("add vertex")) {
				g.vertices.add(ThreadLocalRandom.current().nextLong());
			} else if (line.startsWith("set vertex ")) {
//				String 
//				g.addVertex();
			}

		}
	}
}
