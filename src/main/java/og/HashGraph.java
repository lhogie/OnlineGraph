package og;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class HashGraph extends Graph {
	private Map<String, String> props = new HashMap<>();
	private final List<Change> changes = new ArrayList<>();

	public HashGraph() {
		super(new HashElementSet(), new HashElementSet(), new HashElementSet());
	}

	@Override
	public synchronized void commitNewChange(Change c) {
		changes.add(c);
	}

	@Override
	public synchronized Map<String, String> getProperties() {
		return this.props;
	}

	@Override
	public synchronized void setProperties(Map<String, String> m) {
		this.props = m;
	}

	@Override
	public synchronized void forEachChange(int since, Consumer<Change> c) {
		if (since < changes.size()) {
			changes.subList(since, changes.size()).forEach(c);
		}			
	}

	@Override
	public synchronized int nbChanges() {
		return changes.size();
	}
}
