package og;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import toools.io.file.Directory;
import toools.io.file.RegularFile;

public class PersistentChanges {
	private final Directory d;
	private int len = 0;

	public PersistentChanges(Directory d) {
		this.d = d;
	}

	public <E> void start(int i, Consumer<E> c) {
		for (int b = i / 1000;; ++b) {
			var f = new RegularFile(d, b + ".ser");

			if (!f.exists())
				break;

			var l = (List<E>) f.getContentAsJavaObject();

			// if first block
			if (b == i / 1000) {
				l = l.subList(i % 1000, l.size());
			}

			l.forEach(c);
		}
	}

	public void add(Object o) {
		int bi = len / 1000;
		List<Object> l;
		var f = new RegularFile(d, bi + ".ser");

		if (f.exists()) {
			l = (List<Object>) f.getContentAsJavaObject();
		} else {
			l = new ArrayList<>();
		}

		l.add(o);
		f.setContentAsJavaObject(l);

		++len;
	}
}